const express = require('express');
const ProductController = require('../controller/product.controller');
const ProductImage = require('../utils/fileUpload')

const router = express.Router();

router.post('/create-product',ProductImage.single('productImage'),ProductController.createProduct)
router.get('/get-product',ProductController.getAllProduct)
router.get('/get-product/:id',ProductController.getProductById)
router.put('/update-product/:id',ProductImage.single('productImage'),ProductController.updateProduct)
router.put('/soft-delete-product/:id',ProductController.softDeleteProduct)
router.delete('/delete-product/:id',ProductController.deleteProduct)

module.exports = router