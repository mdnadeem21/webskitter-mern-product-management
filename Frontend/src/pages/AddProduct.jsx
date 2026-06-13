import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createProduct} from '../api/services/createProduct'

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category:"",
    size: "",
    color: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("size", formData.size);
    data.append("color", formData.color);
    data.append("productImage", formData.productImage);
    try {
      const res = await createProduct(data);

      if (res?.data?.status) {
        alert("Product Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-xl px-4">
      <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Product Name"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Product Price"
            onChange={handleChange}
          />

          <textarea
            name="description"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Description"
            rows="3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="brand"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Brand"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Category"
            onChange={handleChange}
          />

          <select
            name="size"
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <select
            name="color"
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="">Select Color</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
          </select>

          <input
            type="file"
            name="image"
            className="w-full rounded-lg border border-gray-300 text-sm file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
