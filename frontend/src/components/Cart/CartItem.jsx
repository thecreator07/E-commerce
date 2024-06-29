import React, { useEffect, useState } from "react";
import { API_URI } from "../../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./cart.module.css";
const CartItem = ({ id, title, description, image, quantity, price }) => {
  const [quantities, setquantity] = useState(quantity);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlequantity = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_URI}/api/v1/cart/${id}`,
        { quantities },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      // Handle response data
      console.log("data", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
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
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      // Handle response data
      // console.log("data", data.data);
      if (!data) {
        throw new Error("Something went wrong during cart item removal ");
      }
      navigate("/cart");
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    handleCartRemove();
  }, []);

  return (
    <div>
      <div className="w-[300px] h-[500px] p-2 bg-[#f5f5f5] cardshadow rounded-lg">
        <div className="h-[50%] w-full rounded-lg overflow-hidden">
          <img src={image} alt="image" className="w-full h-full" />
        </div>
        <div className="">
          <p className="text-2xl font-bold">{title} </p>
          <p className="text-xl font-extralight whitespace-nowrap overflow-hidden text-ellipsis">
            {description}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="">{price}</div>
          <div className=" flex items-center p-1 rounded-3xl bg-slate-500 gap-3">
            <button
              className="w-5 h-5 flex  items-center justify-center font-bold bg-white rounded-full"
              onClick={() => {
                if (quantities === 1) {
                  return quantities;
                }
                setquantity(quantities - 1);
              }}
            >
              -
            </button>
            <button className="text-white">{quantities}</button>
            <button
              className="w-5 h-5 flex  items-center justify-center font-bold bg-white rounded-full"
              onClick={() => {
                if (quantities > 100) {
                  return quantities;
                }
                setquantity(quantities + 1);
              }}
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
            onClick={handlequantity}
          >
            {loading ? "loading" : `Add - ${quantities}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
