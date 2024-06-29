import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/userSlice";
import { API_URI } from "../../utils/constant";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [value, setvalue] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  console.log(value.email, value.password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch(`${API_URI}/api/v1/users/login`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          active: true,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to login");
      }
      setMessage("Login successful!");
      dispatch(
        setLogin({
          user: responseData.data.user,
          accessToken: responseData.data.accessToken,
          refreshToken: responseData.data.refreshToken,
        })
      );
      setloading(false);
      navigate("/");
      // Optionally redirect to another page or handle login success
    } catch (error) {
      console.error("Login Error:", error.message);
      setMessage("Failed to login. Please check your credentials.");
    }
  };

  console.log(message);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              SignIn
            </p>
            <div>
              <label className="block text-start mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                value={value.email}
                onChange={(e) => setvalue({ ...value, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder=""
                id="Email"
                type="email"
              />
            </div>
            <div>
              <label className="block text-start mb-2 text-sm font-medium text-gray-900">
                password
              </label>
              <input
                value={value.password}
                onChange={(e) =>
                  setvalue({ ...value, password: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="Password"
                type="password"
              />
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              {loading ? "loading" : "login"}
            </button>
            <p
              className="text-center underline text-blue-500"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create account
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
