import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../auth/AuthProvider";
import { BASE_URL } from "../utils/Utils";

const AccountPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const res = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setUsers(data);
    } catch (error) {
      console.error("Gagal memuat data user:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus akun ini?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Gagal menghapus akun:", error);
      alert("Terjadi kesalahan saat menghapus akun.");
    }
  };

  if (loading) {
    return <p className="has-text-centered mt-6">Memuat data pengguna...</p>;
  }

  return (
    <div className="container mt-6">
      <div className="box" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '3rem',
        backdropFilter: 'blur(20px)'
      }}>
        <h1 className="title is-4 has-text-dark">Daftar Pengguna</h1>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="4" className="has-text-centered">Tidak ada data pengguna.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="has-text-centered">
                    <button
                      className="button is-small is-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      <span className="icon is-small"><i className="fas fa-trash"></i></span>
                      <span>Hapus</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountPage;
