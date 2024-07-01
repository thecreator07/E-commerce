import React, { useEffect } from "react";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";
import { fetchGetUserCart } from "../../Api/CartApi";
import { useDispatch } from "react-redux";
import { setcart } from "../../Redux/userSlice";
import Button from "@mui/material/Button";

const CartPage = () => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart);
  const totalItems = useSelector((state) => state.totalItems);
  const totalPrice = useSelector((state) => state.totalPrice);
  const handleCart = async () => {
    try {
      const result = await fetchGetUserCart();

      // console.log("responce", result?.data);
      dispatch(
        setcart({
          cart: result?.cartItems,
          totalPrice: result?.totalPrice,
          totalItems: result?.totalItems,
        })
      );
      return;
    } catch (error) {
      console.error("Error cart fetching:", error);
    }
  };

  useEffect(() => {
    handleCart();
  }, []);
  // console.log("Cart", Cart);
  // console.log("totalItems", totalItems);

  return (
    <div className="mt-4 mx-20 flex gap-5 flex-wrap">
      {Cart &&
        Cart.map((item) => (
          <CartItem
            key={item.product._id}
            id={item.product._id}
            title={item.productName}
            description={item.productDescription}
            image={item.product.image}
            quantity={item.quantity}
            price={item.price}
          />
        ))}

      <footer className="w-full shadow-md relative bottom-0 flex p-3 flex-col gap-5 md:flex-row bottom-0">
        <Button variant="text" disabled sx={{color:"black", backgroundColor:"blue", boxShadow:"inherit",}} >Total: ${totalPrice} </Button>{" "}
        <Button variant="text" disabled disa sx={{color:"white", backgroundColor:"blue"}}>Proceed to Buy ({totalItems} items)</Button>
      </footer>
    </div>
  );
};

export default CartPage;
