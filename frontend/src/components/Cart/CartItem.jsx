import React, { useState } from "react";
import axios from "axios";
import { API_URI } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const CartItem = ({ id, title, description, image, quantity, price }) => {
  const [quantities, setQuantities] = useState(quantity);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleIncrement = () => {
    if (quantities < 100) {
      setQuantities(quantities + 1);
    }
  };

  const handleDecrement = () => {
    if (quantities > 1) {
      setQuantities(quantities - 1);
    }
  };

  const handleQuantityUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_URI}/api/v1/cart/${id}`,
        { quantity: quantities },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Updated quantity:", data.data);
      // Assuming data.data contains updated quantity information, you may update UI accordingly
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartRemove = async () => {
    try {
      const { data } = await axios.patch(
        `${API_URI}/api/v1/cart/${id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Cart item removed:", data);
      // Handle UI update or navigation
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      navigate("/cart");
    }
  };

  return (
    <div className="w-[300px] p-2 bg-[#f5f5f5] cardshadow rounded-lg">
      <div className="h-[50%] w-full rounded-lg overflow-hidden">
        <img src={image} alt="image" className="w-full h-full" />
      </div>
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-xl font-extralight whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex justify-between">
        <div>${price}</div>
        <div className="flex items-center p-1 rounded-3xl bg-slate-500 gap-3">
          <button
            className="w-5 h-5 flex items-center justify-center font-bold bg-white rounded-full"
            onClick={handleDecrement}
          >
            -
          </button>
          <button className="text-white">{quantities}</button>
          <button
            className="w-5 h-5 flex items-center justify-center font-bold bg-white rounded-full"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button
          className="px-4 py-2 bg-blue-700 rounded-3xl text-white font-semibold"
          onClick={handleCartRemove}
        >
          Remove
        </button>
        <button
          className="px-4 py-2 bg-blue-700 rounded-3xl text-white font-semibold"
          onClick={handleQuantityUpdate}
          disabled={loading}
        >
          {loading ? "Loading..." : `Update - ${quantities}`}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
