import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URI } from "../../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { productId } = params;
  const user = useSelector((state) => state.user);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleremove = async () => {
    try {
      const responce = await axios.delete(
        `${API_URI}/api/v1/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      if (!responce) {
        setError(responce);
      }

      navigate("/product");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong"); // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URI}/api/v1/products/${productId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            withCredentials: true,
          }
        );

        const { data } = await response.data;

        console.log(data.product);
        setProduct(data.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="bg-cover bg-center h-64"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="text-gray-700">
            <span className="text-base font-medium">Category:</span>{" "}
            <span className="text-base text-slate-600">
              {product.category}{" "}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-gray-700 font-bold">${product.price}</div>
            <div className="text-gray-700">Stock: {product.stock}</div>
          </div>
          <div
            className={`mt-2 ${
              user?.role === "admin" ? "flex justify-between" : ""
            }`}
          >
            {user?.role === "admin" ? (
              <>
                <button
                  onClick={handleremove}
                  className="p-2.5 bg-blue-700 rounded-3xl text-white font-semibold"
                >
                  Remove
                </button>
                <Link to={`/admin/updateProduct/${productId}`}
                  // onClick={handleupdate}
                  className="p-2.5 bg-blue-700 rounded-3xl text-white font-semibold"
                >
                  Update
                </Link>
              </>
            ) : (
              <button className="p-2.5 bg-blue-700 rounded-3xl text-white font-semibold">
                Order Now
              </button>
            )}
          </div>
          {/* <div className="mt-4 flex items-center">
            <div className="ml-auto text-sm text-gray-600">
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
