import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
