import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import useAuth from "../auth/UseAuth";
import { BASE_URL } from "../utils/Utils";

export default function RancanganKerjaPage() {
  const { user, accessToken } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !accessToken) return;

        const response = await axios.get(`${BASE_URL}/kegiatan-kerja/user/${user.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(response.data);
      } catch (error) {
        console.error("Gagal fetch:", error);
      }
    };

    fetchData();
  }, [user, accessToken]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/delete-kegiatan-kerja/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Rancangan Kerja</h1>
        <button style={createButtonStyle} onClick={() => navigate("/rencana-kerja/create")}>
          Create Rencana Kerja
        </button>
      </div>

      <div>
        {data.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div>
              <h3 style={cardTitle}>{item.nama_kegiatan}</h3>
              <p style={cardText}>{item.deskripsi}</p>
              <p style={dateText}>
                <span style={{ fontWeight: "bold", color: "#1a202c" }}>📅 Tanggal:</span> {item.tanggal}
              </p>
            </div>
            <div style={cardFooter}>
              <button 
                style={actionBtn}
                onClick={() => navigate("/anggaran")}
              >
                Select
              </button>
              <button 
                style={{ ...actionBtn, backgroundColor: "#32a881" }}
                onClick={() => navigate(`/edit-rencana-kerja/${item.id}`)}
              >
                Edit
              </button>
              <button
                style={{ ...actionBtn, backgroundColor: "#e53e3e" }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  padding: "24px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f9fafb",
  color: "#1a202c",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px"
};

const titleStyle = {
  fontSize: "1.75rem",
  fontWeight: "700",
  margin: 0
};

const createButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem"
};

const cardStyle = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  marginBottom: "1.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "180px",
  position: "relative"
};

const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  margin: "0 0 6px 0"
};

const cardText = {
  fontSize: "1rem",
  marginBottom: "6px",
  color: "#2d3748" // teks deskripsi lebih gelap
};

const dateText = {
  fontSize: "1rem",
  marginBottom: "6px",
  color: "#1a202c", // pastikan default warna teks terlihat
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

const cardFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "auto",
};

const actionBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4f46e5",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem"
};
