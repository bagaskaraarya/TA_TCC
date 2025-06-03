import { useEffect, useState } from "react";
import axios from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/UseAuth";
import { BASE_URL } from "../utils/Utils";

export default function AnggaranPage() {
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/anggaran`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetch:", err);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus anggaran ini?");
    if (!confirm) return;

    try {
      await axios.delete(`${BASE_URL}/delete-anggaran/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Data Anggaran</h1>
        <button style={styles.createBtn} onClick={() => navigate("/anggaran/create")}>
          + Buat Anggaran Baru
        </button>
      </div>

      <table style={styles.table}>
        <thead>
            <tr>
                <th style={styles.th}>No.</th>
                <th style={styles.th}>Keterangan</th>
                <th style={styles.th}>Jumlah</th>
                <th style={styles.th}>Harga</th>
                <th style={styles.th}>Total Harga</th>
                <th style={styles.th}>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr>
                <td colSpan="6" style={styles.empty}>Tidak ada data</td>
                </tr>
            ) : (
                data.map((item, index) => (
                <tr key={item.id}>
                    <td style={styles.td}>{index + 1}</td> {/* No. auto increment */}
                    <td style={styles.td}>{item.keterangan}</td>
                    <td style={styles.td}>{item.jumlah}</td>
                    <td style={styles.td}>Rp {item.harga?.toLocaleString("id-ID")}</td>
                    <td style={styles.td}>Rp {item.total_harga?.toLocaleString("id-ID")}</td>
                    <td style={styles.td}>
                    <button
                        style={{ ...styles.btn, backgroundColor: "#667eea" }}
                        onClick={() => navigate(`/anggaran/edit/${item.id}`)}
                    >
                        Edit
                    </button>
                    <button
                        style={{ ...styles.btn, backgroundColor: "#e53e3e" }}
                        onClick={() => handleDelete(item.id)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
      </table>

      <button style={styles.backBtn} onClick={() => navigate("/rencana-kerja")}>
        ⬅ Kembali ke Rencana Kerja
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "32px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#363636",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#764ba2",
  },
  createBtn: {
    padding: "10px 20px",
    backgroundColor: "#667eea",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    border: "1px solid #e8e8e8",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  th: {
    backgroundColor: "#764ba2",
    color: "#ffffff",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e8e8e8",
    color: "#4a4a4a",
  },
  btn: {
    marginRight: "8px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
  },
  backBtn: {
    marginTop: "24px",
    padding: "10px 18px",
    backgroundColor: "#764ba2",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    padding: "16px",
    color: "#999999",
  },
};
