import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProductPage from "../../components/product/ProductPage";
import CartPage from "../../components/Cart/CartPage";
import ProductDetails from "../../components/product/ProductDetails";
import AddProductPage from "../../components/Admin/AddProductPage";
import UpdateProduct from "../../components/Admin/UpdateProduct";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/product");
    }
  }, []);

  return (
    <div className="min-w-screen h-screen">
      <div className="w-full h-full">
        <Navbar />
        <Routes>
          <Route path="/product" element={<ProductPage />} />
          <Route
            path="/singleProduct/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/addProduct" element={<AddProductPage />} />
          <Route
            path="/admin/updateProduct/:productId"
            element={<UpdateProduct />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
