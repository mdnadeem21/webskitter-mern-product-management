const fs = require('fs');
const path = require('path');
const Product = require('../../app/model/product.model')
const StatusCode = require('../utils/status.code');
const { uploadFileOnCloudinary } = require('../utils/fileUploadOnCloudinary');

class ProductController{

    async createProduct(req,res){
        try {
            const{
                name,
                description,
                shortDescription,
                brand,
                category,
                price,
                discountPrice,
                currency,
                variants,
                images,
                tags,
                status,
                isDeleted,
                ratings,
            } = req.body
            if((!name || !description)){
                return res.status(StatusCode.BAD_REQUEST)
                            .json({
                                status:false,
                                message:"Name and Description are required"
                            })
            }
            const product = new Product({
                name,
                description,
                shortDescription,
                brand,
                category,
                price,
                discountPrice,
                currency,
                variants,
                images,
                tags,
                status
            })
            if(req.file){
                product.productImage = req.file.path
                product.productImage = await uploadFileOnCloudinary(req.file.path)
            }
            const data = await product.save();
            return res.status(StatusCode.CREATED).json({
                status:true,
                message:"Product created successfully",
                data:data
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:"something went wrong in product creation",
                error:error.message
            })
        }
    }
    async getAllProduct(req,res){
        try {
            const products = await Product.find({
                isDeleted:false
            })

            return res.status(StatusCode.SUCCESS)
                        .json({
                            status:true,
                            total:products.length,
                            message:"Product fetched successfully",
                            data:products
                        })
        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                status:false,
                message:"something went wrong in get product",
                error:error.message
            })
        }
    }
    async getProductById(req,res){
        try {
            const { id } = req.params;
            const product = await Product.findById({
                _id:id,
                isDeleted:false});

            if (!product) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Product not found",
            });
            }

            return res.status(StatusCode.SUCCESS).json({
            success: true,
            data: product,
            });
        } catch (error) {
            return res.status(StatusCode.SERVER_ERROR).json({
                status: false,
                message: "something went wrong",
                error: error.message,
              });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            
            
            let updateData = { ...req.body };
    
            
            if (req.file) {
                const oldProduct = await Product.findOne({ _id: id, isDeleted: false });
                
                if (!oldProduct) {
                    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                    return res.status(404).json({
                        status: false,
                        message: "Product not found"
                    });
                }
    
                if (oldProduct.productImage) { 
                    const oldFilePath = path.resolve(process.cwd(), oldProduct.productImage);  
                    
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
    
                
                updateData.productImage = req.file.path;
            }
    
            
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: id, isDeleted: false },
                updateData,
                { new: true }
            );
    
            if (!updatedProduct) {
                return res.status(404).json({
                    status: false,
                    message: "Product not found"
                });
            }
    
            return res.status(200).json({
                status: true,
                message: "Product updated successfully",
                data: updatedProduct 
            });
    
        } catch (error) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(500).json({
                status: false,
                message: "Something went wrong in updation",
                error: error.message,
            });
        }
    }

    async softDeleteProduct(req, res) {
        try {
            const id = req.params.id;
    
            const deletedProduct = await Product.findByIdAndUpdate({
                _id:id,
                },{
                    isDeleted:true
                },{new:true}
            );
            if (!deletedProduct) {
                return res.status(404).json({ 
                    status: false, 
                    message: "Product not found" 
                });
            }
    
            
            
            
            return res.status(200).json({
                status: true,
                message: "Product soft deleted successfully",
            });
    
        } catch (error) {
            console.log("Error in soft Delete : ",error.message)
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                error: error.message, 
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
    
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ 
                    status: false, 
                    message: "Product not found" 
                });
            }
    
            
            if (product.productImage && fs.existsSync(product.productImage)) {
                try {
                    await fs.promises.unlink(product.productImage);
                } catch (fileError) {
                    console.error("File deletion failed:", fileError);
                }
            }
    
            await Product.findByIdAndDelete(id);
    
            return res.status(200).json({
                status: true,
                message: "Product deleted successfully",
            });
    
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                error: error.message, 
            });
        }
    }
}

module.exports = new ProductController;