// src/pages/EditAnggaranPage.js
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/AxiosInstance";
import { BASE_URL } from "../utils/Utils";

export default function EditAnggaranPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/anggaran/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setKeterangan(res.data.keterangan);
        setJumlah(res.data.jumlah.toString());
        setHarga(res.data.harga.toString());
      } catch (error) {
        console.error("Gagal memuat data:", error);
        alert("Gagal memuat data anggaran");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/update-anggaran/${id}`, {
        keterangan,
        jumlah: parseInt(jumlah),
        harga: parseFloat(harga),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Anggaran berhasil diperbarui");
      navigate("/anggaran");
    } catch (error) {
      console.error("Gagal memperbarui anggaran:", error);
      alert("Terjadi kesalahan saat memperbarui anggaran");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Edit Anggaran</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroup}>
          <label style={labelStyle}>Keterangan</label>
          <input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Jumlah</label>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Harga</label>
          <input
            type="number"
            step="0.01"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={buttonGroup}>
          <button type="submit" style={submitButton}>Simpan Perubahan</button>
          <button type="button" onClick={() => navigate("/anggaran")} style={cancelButton}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

// Styling sama seperti di CreateAnggaranPage
const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "24px",
  fontFamily: "Arial, sans-serif",
  color: "#363636",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "6px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #e8e8e8",
  borderRadius: "6px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "flex-start",
  gap: "10px",
};

const submitButton = {
  backgroundColor: "#667eea",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};

const cancelButton = {
  backgroundColor: "#764ba2",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};
