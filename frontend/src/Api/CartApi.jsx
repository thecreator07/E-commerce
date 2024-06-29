import { API_URI } from "../utils/constant";
import axios from "axios";
export const fetchAddCartItem = async (productId, data, token) => {
  try {
    const response = await axios.post(
      `${API_URI}/api/v1/cart/:${productId}`,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchRemoveCartItem = async (productId, token) => {
  try {
    const response = await axios.patch(
      `${API_URI}/api/v1/cart/:${productId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchGetUserCart = async () => {
  try {
    const { data } = await axios.get(`${API_URI}/api/v1/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      withCredentials: true,
    });

    // Handle response data
    console.log("data", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
