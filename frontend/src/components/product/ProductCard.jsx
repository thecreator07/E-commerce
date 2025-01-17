import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { API_URI } from "../../utils/constant";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
// import "./product.module.css";
// import { useParams } from "react-router-dom";
const ProductCard = ({ title, description, price, image, id }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleCart = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URI}/api/v1/cart/${id}`,
        { quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      console.log(response.data); // Optional: Log response for debugging
      if (!response) {
        throw new Error("Something went wrong during cart adding");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };
  // useEffect(()=>{
  //   handleCart()
  // },[])
  return (
    <>
      <div className="w-full mx-2 md:m-0 md:w-[250px] h-[350px] p-2 bg-white cardshadow rounded-lg">
        {/* Link to single product page */}
        <div className="h-[60%] w-full rounded-lg overflow-hidden relative">
          <Link
            to={`/singleProduct/${id}`}
            className="absolute w-full h-full"
          ></Link>
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="mt-2">
          <p className="text-xl font-bold whitespace-nowrap text-orange-500">
            {title}
          </p>
          <p className="text-lg font-light whitespace-nowrap overflow-hidden text-ellipsis text-gray-700">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg text-orange-500">${price}</span>
          {/* Button for adding to cart */}

          {user?.role === "admin" ? (
            <div
              onClick={() => {
                navigate(`/singleProduct/${id}`);
              }}
              className={`card-button border-[2px] ${
                loading ? "animate-bounce" : ""
              } border-orange-500 rounded-full p-1 hover:border-orange-500 hover:bg-orange-500 transition-all cursor-pointer`}
            >
              <IoSettingsOutline color="green" size={30} />
              {/* <svg
                className="svg-icon w-10 text-orange-500 hover:text-white"
                viewBox="0 0 20 20"
              >
                <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
              </svg> */}
            </div>
          ) : (
            <Button
              onClick={handleCart}
              className="p-2.5 bg-blue-700 rounded-3xl text-white font-semibold"
            >
              Add to cart
            </Button>
            // <div
            //   onClick={handleCart}
            //   className={`card-button border-[2px] ${
            //     loading ? "animate-bounce" : ""
            //   } border-orange-500 rounded-full p-1 hover:border-orange-500 hover:bg-orange-500 transition-all cursor-pointer`}
            // >
            //   <svg
            //     className="svg-icon w-10 text-orange-500 hover:text-white"
            //     viewBox="0 0 20 20"
            //   >
            //     <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            //     <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            //     <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
            //   </svg>
            // </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
