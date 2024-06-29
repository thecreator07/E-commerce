import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../utils/constant";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // This will hold the file object for image upload
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      if (image) {
        formData.append("image", image); // Append the image file to FormData if it exists
      }

      const response = await axios.post(
        `${API_URI}/api/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      console.log("Product added successfully:", response.data);
      navigate("/product");
      // Handle success (show message, redirect, etc.)
    } catch (error) {
      console.error("Add Product Error:", error);
      // Handle error (show error message, reset form, etc.)
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state with selected file
  };

  return (
    <div className="mx-auto md:w-[35%] my-5 p-2 flex flex-col gap-8 cardshadow rounded-xl">
      <h2 className="text-xl text-center text-slate-300 font-bold leading-tight tracking-tight text-[#414141]  filter md:text-3xl ">
        Product
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <textarea
          className="h-28 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          required
        ></textarea>
        <div className="flex justify-between gap-4 ">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            required
          />
        </div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button
          type="submit"
          className="m-2 font-semibold p-2.5 bg-blue-400 rounded-lg"
        >
          {loading ? "loading" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
