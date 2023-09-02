import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/${url}`
    );
    return response.data;
  } catch (error) {}
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
  } catch (error) {}
};
