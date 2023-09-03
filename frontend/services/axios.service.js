import axios from "axios";
import { errorToast } from "./toastify.service";

export const getData = async (url) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/${url}`
    );
    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
  }
};

export const postData = async (url, data, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
  }
};
export const updateData = async (url, data, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
  }
};

export const deleteData = async (url, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
  }
};
