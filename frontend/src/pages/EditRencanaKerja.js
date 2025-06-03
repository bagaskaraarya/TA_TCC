import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/AxiosInstance";
import useAuth from "../auth/UseAuth";
import { BASE_URL } from "../utils/Utils";

export default function EditRencanaKerja() {
  const { id } = useParams();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_kegiatan: "",
    deskripsi: "",
    tanggal: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/kegiatan-kerja/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setForm({
          nama_kegiatan: res.data.nama_kegiatan,
          deskripsi: res.data.deskripsi,
          tanggal: res.data.tanggal.slice(0, 10), // Format tanggal untuk input
        });
      } catch (err) {
        setError("Gagal memuat data.");
        console.error(err);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama_kegiatan || !form.deskripsi || !form.tanggal) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/update-kegiatan-kerja/${id}`,
        { ...form, userId: user.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      navigate("/rancangan-kerja");
    } catch (err) {
      console.error("Gagal update data:", err);
      setError("Terjadi kesalahan saat memperbarui data.");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Edit Rencana Kerja</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="hidden" name="userId" value={user.id} />

          <label style={label}>Nama Kegiatan</label>
          <input
            type="text"
            name="nama_kegiatan"
            value={form.nama_kegiatan}
            onChange={handleChange}
            style={input}
          />

          <label style={label}>Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            style={{ ...input, height: "100px", resize: "none" }}
          />

          <label style={label}>Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            style={input}
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={button}>Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
}

// Styling (sama dengan Create)
const container = {
  minHeight: "100vh",
  backgroundColor: "#f9fafb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px"
};

const card = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "500px"
};

const title = {
  fontSize: "1.8rem",
  fontWeight: "700",
  marginBottom: "24px",
  textAlign: "center",
  color: "#1a202c"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
};

const label = {
  fontWeight: "600",
  color: "#4a5568",
  fontSize: "0.95rem"
};

const input = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e0",
  fontSize: "1rem",
  outline: "none"
};

const button = {
  backgroundColor: "#4f46e5",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "12px"
};

const errorStyle = {
  color: "#e53e3e",
  fontSize: "0.9rem",
  marginTop: "-8px"
};
