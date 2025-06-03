import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // ganti dengan URL backend kamu
  withCredentials: true, // untuk cookie token
});

export default axiosInstance;
