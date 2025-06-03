import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/AxiosInstance.js";
import PropTypes from 'prop-types';
import { BASE_URL } from "../utils/Utils.js";

// 1. Membuat context untuk autentikasi
const AuthContext = createContext();

// 2. Provider untuk membungkus aplikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Menyimpan token akses di memori

  // 3. Fungsi login
   const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}login`, { email, password }, {
        withCredentials: true
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.user.id);

      setAccessToken(res.data.accessToken);
      Cookies.set("refreshToken", res.data.refreshToken, {
        sameSite: "Strict",
        secure: false,
        expires: 5,
      });

      // Tambahkan pengecekan respons
      console.log("Login response:", res.data);

      // Pastikan backend kirim data user di res.data.user
      setUser(res.data.user); // <-- GAGAL kalau res.data.user undefined
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };


  // 4. Fungsi logout
  const logout = async () => {
  try {
    // Kirim permintaan logout ke backend untuk menghapus refreshToken dari DB
    await axios.delete(`${BASE_URL}logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("token");
  
    localStorage.removeItem("userId");
    setUser(null);
  } catch (err) {
    console.error("Logout error:", err);
  }

  // Bersihkan token dari client
  setAccessToken(null);             // Reset state accessToken (misal di context)
  Cookies.remove("refreshToken");   // Hapus refreshToken dari cookie browser
};

  // 5. Fungsi refresh token
  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}token`, {
        withCredentials: true // Kirim cookie refreshToken
      });

      setAccessToken(res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout(); // Logout jika token refresh gagal
      return null; // Bisa dikembalikan ke login page oleh komponen lain
    }
  };

  // 6. Menyediakan value ke komponen lain
  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, refreshAccessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 7. Validasi prop children menggunakan prop-types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 8. Custom hook untuk menggunakan context ini
export const useAuthContext = () => useContext(AuthContext);
