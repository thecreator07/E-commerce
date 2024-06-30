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

// export const fetchGetAllProduct = async (query) => {
//   try {
//     let url = `${API_URI}/api/v1/products`;
// if (query) {
//   url += `?query=${query}`;
// }

//     const { data } = await axios.get(
//       url,
//       // {data},
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         withCredentials: true,
//       }
//     );
//     // const data = (await response).data;

//     // const product = data?.productData;
//     console.log(data);
//     return data.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

export const fetchGetAllProduct = async ({query}) => {
  try {
    let url = `${API_URI}/api/v1/products`;
    if (query) url += `?query=${query}`;

    console.log(url);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return await response.data; // Assuming your API returns { statusCode, data, message }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Handle errors as per your application's needs
  }
};
