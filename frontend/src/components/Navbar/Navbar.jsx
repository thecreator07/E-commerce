import React, { useEffect, useState } from "react";
import {
  MdShoppingCartCheckout,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import { fetchGetAllProduct } from "../../Api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { setlogOut, setsearchData } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Api/UserApi";
// import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.accessToken);
  console.log("user", user, "token", token);
  const [query, setquery] = useState("");
  console.log(query);
  const handleSearch = async () => {
    try {
      const data = await fetchGetAllProduct(query);
      console.log(data.productData);
      dispatch(setsearchData({ product: data?.productData }));
      setquery("");
    } catch (error) {
      // Handle error (show error message, etc.)
      console.error("Error fetching products:", error);
      setquery('')
    }
  };

  const handleLogout = async () => {
    try {
      // console.log(token)
      const responce = await logoutUser();

      if (!responce) {
        throw new Error("Something went wrong during Logout");
      }
      dispatch(setlogOut());

      navigate("/product");
      // Handle successful logout
      console.log("User logged out successfully:", responce);
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <section className="flex sticky z-50 top-0 w-full justify-between bg-yellow-100 items-center py-2 px-4">
      <h1
        className="font-bold text-3xl text-orange-400 cursor-pointer"
        onClick={() => {
          navigate("/product");
        }}
      >
        {user?.role === "admin" ? "Admin" : "Ecommerce"}
      </h1>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setquery(e.target.value);
          }}
          placeholder="Search..."
          className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl transition-all focus:w-64 outline-none"
          name="search"
          type="text"
        />
        <svg
          onClick={handleSearch}
          className="size-6 absolute cursor-pointer top-3 right-3 text-gray-500"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      <div className="flex items-center gap-7">
        <label className="popup">
          <input type="checkbox" />
          <div tabindex="0" class="burger">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"></path>
            </svg>
          </div>
          <nav className="popup-window">
            <ul>
              {!user && !token ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 4v6.406l-3.753 3.741-6.463-6.462 3.7-3.685h6.516zm2-2h-12.388l1.497 1.5-4.171 4.167 9.291 9.291 4.161-4.193 1.61 1.623v-12.388zm-5 4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm6.708.292l-.708.708v3.097l2-2.065-1.292-1.74zm-12.675 9.294l-1.414 1.414h-2.619v2h-2v2h-2v-2.17l5.636-5.626-1.417-1.407-6.219 6.203v5h6v-2h2v-2h2l1.729-1.729-1.696-1.685z"></path>
                      </svg>
                      <span>Log In</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.598 9h-1.055c1.482-4.638 5.83-8 10.957-8 6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5c-5.127 0-9.475-3.362-10.957-8h1.055c1.443 4.076 5.334 7 9.902 7 5.795 0 10.5-4.705 10.5-10.5s-4.705-10.5-10.5-10.5c-4.568 0-8.459 2.923-9.902 7zm12.228 3l-4.604-3.747.666-.753 6.112 5-6.101 5-.679-.737 4.608-3.763h-14.828v-1h14.826z"></path>
                      </svg>
                      <span>Sign Up</span>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.598 9h-1.055c1.482-4.638 5.83-8 10.957-8 6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5c-5.127 0-9.475-3.362-10.957-8h1.055c1.443 4.076 5.334 7 9.902 7 5.795 0 10.5-4.705 10.5-10.5s-4.705-10.5-10.5-10.5c-4.568 0-8.459 2.923-9.902 7zm12.228 3l-4.604-3.747.666-.753 6.112 5-6.101 5-.679-.737 4.608-3.763h-14.828v-1h14.826z"></path>
                    </svg>
                    <span>logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </label>
        <div className="rounded-full bg-green-200 hover:bg-[#00bf63] p-2 cursor-pointer hover:scale-110 hover:bg-green-900 transition-all transit">
          {user?.role === "admin" ? (
            <MdOutlineAddShoppingCart
              onClick={() => {
                navigate("/admin/addProduct");
              }}
              size={30}
              color="blue"
              className="text-green-950 hover:text-black "
            />
          ) : (
            <MdShoppingCartCheckout
              onClick={() => {
                navigate("/cart");
              }}
              size={35}
              color="blue"
              className="text-green-950 hover:text-black "
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
