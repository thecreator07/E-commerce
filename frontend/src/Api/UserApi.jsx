import axios from "axios";
import { API_URI } from "../utils/constant.js";
import { useSelector } from "react-redux";

export const registerUser = async (data) => {
  const response = await fetch(`${API_URI}/api/v1/users/register`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  // console.log(result);
  return result;
};

// export const registerUser = async (data) => {
//   try {
//     const response = axios.post(
//       `${API_URI}/api/v1/users/register`,
//       { data },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Handle response data
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

export const loginUser = async (data) => {
  try {
    const response = axios.post(
      `${API_URI}/api/v1/users/login`,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // localStorage.setItem();
    // Handle response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = axios.post(
      `${API_URI}/api/v1/users/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        withCredentials: true,
      }
    );

    // Handle response data
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
