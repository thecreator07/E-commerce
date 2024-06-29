import React, { useEffect, useState } from "react";
import { registerUser } from "../../Api/UserApi";
import { API_URI } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [check, setcheck] = useState(false);
  const [loading, setloading] = useState(false);
  console.log(check);
  const [value, setvalue] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // console.log(value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", value.fullname);
    formData.append("email", value.email);
    formData.append("password", value.password);
    // formData.append("phone", phone);
    formData.append("role", value.role);
    // formData.append("dob", dob);
    // formData.append("gender", gender);
    // formData.append("address", address);
    // if (avatar) {
    //   formData.append("avatar", avatar);
    // }

    try {
      setloading(true);
      const response = await fetch(`${API_URI}/api/v1/users/register`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to register user");
      }
      console.log(responseData);
      setMessage("User registered successfully!");
      setloading(false);
      navigate("/login");

      // Optionally reset form fields or redirect to another page
    } catch (error) {
      console.error("Registration Error:", error.message);
      setMessage("Failed to register user. Please try again.");
    }
  };
  console.log(value);
  console.log(message);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </p>
            <div>
              <label
                htmlFor="fullname"
                className="block text-start mb-2 text-sm font-medium text-gray-900"
              >
                Fullname
              </label>
              <input
                value={value.fullname}
                onChange={(e) =>
                  setvalue({ ...value, fullname: e.target.value })
                }
                placeholder="JohnDoe"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="fullname"
                type="text"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-start mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                value={value.email}
                onChange={(e) => setvalue({ ...value, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder=""
                id="email"
                type="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-start mb-2 text-sm font-medium text-gray-900"
              >
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
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  value={check}
                  onChange={() => {
                    setcheck(!check);
                    setvalue({ ...value, role: !check ? "admin" : "user" });
                  }}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  type="checkbox"
                  aria-describedby="terms"
                  id="terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500 text-gray-300">
                  Register as Admin
                </label>
              </div>
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              {loading ? "loading" : "Create an account"}
            </button>
            <h1
              onClick={() => {
                navigate("/login");
              }}
              className="text-center underline text-blue-500"
            >
              Already account
            </h1>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterPage;
