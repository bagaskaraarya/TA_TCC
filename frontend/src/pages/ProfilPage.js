// src/pages/ProfilPage.js
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import { FaUser, FaEnvelope, FaUserTag, FaEdit } from "react-icons/fa";
import { BASE_URL } from "../utils/Utils";

export default function ProfilPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [totalRencanaKerja, setTotalRencanaKerja] = useState(0);
  const [totalAnggaran, setTotalAnggaran] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const [rencanaRes, anggaranRes] = await Promise.all([
          axios.get(`${BASE_URL}/kegiatan-kerja`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/anggaran`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setTotalRencanaKerja(rencanaRes.data.length);
        const totalHarga = anggaranRes.data.reduce((sum, item) => sum + (item.total_harga || 0), 0);
        setTotalAnggaran(totalHarga);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>Profil Pengguna</h1>

      <div style={card}>
        <p style={infoText}>
            <span style={labelStyle}>
                <FaUser style={iconStyle} /> Nama:
            </span>
            <span>{user?.name}</span>
            </p>

            <p style={infoText}>
            <span style={labelStyle}>
                <FaEnvelope style={iconStyle} /> Email:
            </span>
            <span>{user?.email}</span>
            </p>

            <p style={infoText}>
            <span style={labelStyle}>
                <FaUserTag style={iconStyle} /> Peran:
            </span>
            <span>{user?.role}</span>
            </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <button style={editButton} onClick={() => navigate("/edit-profile")}>
            <FaEdit style={{ marginRight: 6 }} /> Edit Profil
          </button>
          {/*Tambahkan tombol Hapus Akun (khusus admin)*/}
            {user?.role === "admin" && (
            <button
                style={deleteButton}
                onClick={() => navigate("/akun")}
            >
                🗂 Kelola Akun
            </button>
            )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", marginTop: "32px" }}>
        <div style={statCard}>
          <h3>Total Rencana Kerja</h3>
          <p style={statNumber}>{totalRencanaKerja}</p>
        </div>
        <div style={statCard}>
          <h3>Total Anggaran</h3>
          <p style={statNumber}>Rp {totalAnggaran.toLocaleString("id-ID")}</p>
        </div>
      </div>
    </div>
  );
}

// Styles
const container = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "24px",
  fontFamily: "Segoe UI, sans-serif",
  color: "#333",
};

const title = {
  fontSize: "2rem",
  color: "#764ba2",
  marginBottom: "24px",
};

const card = {
  backgroundColor: "#f9f9f9",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const infoText = {
  fontSize: "1rem",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  color: "#222",
};

const iconStyle = {
  marginRight: 8,
  color: "#764ba2",
};

const editButton = {
  padding: "10px 16px",
  backgroundColor: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const statCard = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  textAlign: "center",
};

const statNumber = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  marginTop: "8px",
  color: "#4c51bf",
};

const labelStyle = {
  color: "#00094a", // Biru Docker
  fontWeight: "600",
  marginRight: "6px",
  display: "flex",
  alignItems: "center",
};

const deleteButton = {
  padding: "10px 16px",
  backgroundColor: "#e53e3e", // Merah
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};