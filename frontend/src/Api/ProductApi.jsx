import axios from "axios";
import { API_URI } from "../utils/constant";

export const fetchAddProduct = async (formdata) => {
  try {
    const response = axios.post(
      `${API_URI}/api/v1/products`,
      { formdata },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const fetchUpdateProduct = async (productId, formdata) => {
  try {
    const response = axios.patch(
      `${API_URI}/api/v1/products:${productId}`,
      { formdata },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const fetchDeleteProduct = async (productId) => {
  try {
    const response = axios.delete(
      `${API_URI}/api/v1/products:${productId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
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

export const fetchGetAllProduct = async (query) => {
  try {
    let url = `${API_URI}/api/v1/products`;
    if (query) {
      url += `?query=${query}`;
    }

    const response = axios.get(
      url,
      // {data},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = (await response).data;
    const result = data.data;
    const product = result.productData;
    return product;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
