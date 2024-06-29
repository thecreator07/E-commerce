import React from "react";
import ProductCard from "./ProductCard";
// import { Route, Routes } from "react-router-dom";
// import ProductDetails from "./ProductDetails";
import { useSelector } from "react-redux";
const ProductPage = () => {
  const product = useSelector((state) => state.product);
  // const usetoken = useSelector((state) => state.accessToken);
  // console.log(usetoken)
  // console.log(product[0]);
  return (
    <div className="mt-4 lg:mx-20 mx-2 flex gap-5 flex-wrap">
      {/* map this */}
      {product.map((item) => (
        <ProductCard
          key={item.id}
          image={item.image}
          title={item.name}
          description={item.description}
          id={item._id}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default ProductPage;
