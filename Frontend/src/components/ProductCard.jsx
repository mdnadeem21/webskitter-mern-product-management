import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { softDeleteProduct } from "../api/services/softDelete";
import { getProductById } from "../api/services/getProductById";
import { deleteProduct } from "../api/services/deleteProduct";
import { getData } from "../context/DataContext";

function ProductCard({ product }) {
  const { fetchAllProducts } = getData();
  const navigate = useNavigate();

  const onSoftDelete = async (product) => {
    alert("Are you sure want to archive this product?");
    try {
      const response = await softDeleteProduct(product._id);

      if (response.data.status) {
        fetchAllProducts();
      } else {
        alert("Failed to archive product.");
      }
    } catch (error) {
      console.error("Error during soft delete:", error);
    }
  };

  const handleEdit = async (product) => {
    console.log(product);
    navigate("/edit-product");
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure to delete?");
    if (!isConfirmed) return;

    try {
      const pdt = await getProductById(id);

      const res = await deleteProduct(id);

      if (res?.status === 200 || res?.data?.status) {
        alert("Product Deleted Successfully! 🎉");

        fetchAllProducts();
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-4 h-full flex flex-col justify-between bg-white">
      <div>
        <img
          src={product.productImage?`http://localhost:6060/${product.productImage}`
          :"https://images.pexels.com/photos/19500076/pexels-photo-19500076.jpeg"
            }
          alt={product.name}
          className="bg-gray-100 aspect-square w-full object-cover rounded-xl mb-3"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        <div className="space-y-1 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Product Name
          </p>
          <h1 className="line-clamp-2 text-base font-semibold text-gray-800">
            {product.name}
          </h1>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 pt-1">
            Brand
          </p>
          <p className="line-clamp-2 text-sm text-gray-600">
            {product.brand || "No brand provided."}
          </p>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 pt-1">
            Description
          </p>
          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description || "No description provided."}
          </p>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 pt-1">
            Price
          </p>
          <p className="text-xl text-gray-900 font-extrabold">
            ${product.price}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
        <Link
          to={`/edit-product/${product._id}`}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium text-xs py-2 px-1 rounded-lg transition-colors flex items-center justify-center"
          title="View Details"
        >
          Edit
        </Link>

        <button
          onClick={() => onSoftDelete && onSoftDelete(product)}
          className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-medium text-xs py-2 px-1 rounded-lg transition-colors flex items-center justify-center"
          title="Archive / Hide"
        >
          Archive
        </button>

        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-medium text-xs py-2 px-1 rounded-lg transition-colors flex items-center justify-center"
          title="Permanent Delete"
        >
          Delete
        </button>
      </div>
    </div>

    
   
  );
}

export default ProductCard;
