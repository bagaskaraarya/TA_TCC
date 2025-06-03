import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/Utils";

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  useEffect(() => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get(`${BASE_URL}/users/${id}`, config)
    .then(res => {
      setNama(res.data.name);
      setEmail(res.data.email);
    })
    .catch(err => {
      console.error("Gagal memuat data profil:", err);
    });
}, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (password && password !== confirmPassword) {
        setErrorMsg("Password dan konfirmasi password tidak cocok.");
        return;
    }   
    try {
      await axios.put(`${BASE_URL}/update-profile`, {
        name,
        email,
        password
      }, config);
      setSuccessMsg("Profil berhasil diperbarui.");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || "Gagal memperbarui profil.");
    }
  };

  const userId = localStorage.getItem("userId"); // Ambil dari localStorage
  const handleBack = () => {
    navigate(`/users/${userId}`);
    };

  return (
    <div className="hero is-fullheight" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Elemen Dekoratif */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: '150px', height: '150px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(70px)', animation: 'float 6s infinite ease-in-out' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '120px', height: '120px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 8s infinite ease-in-out reverse' }}></div>

      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              <div className="box" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                padding: '3rem',
                backdropFilter: 'blur(20px)'
              }}>
                <div className="has-text-centered mb-5">
                  <h1 className="title is-3 has-text-dark">Edit Profil</h1>
                  <p className="subtitle is-6 has-text-grey">Perbarui informasi akun Anda</p>
                </div>

                {errorMsg && (
                  <div className="notification is-danger is-light">{errorMsg}</div>
                )}
                {successMsg && (
                  <div className="notification is-success is-light">{successMsg}</div>
                )}

                <form onSubmit={handleUpdate}>
                  <div className="field mb-4">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Nama Lengkap"
                        value={name}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        style={{ borderRadius: '12px' }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mb-5">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ borderRadius: '12px' }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mb-4">
                    <div className="control has-icons-left">
                        <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password Baru"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderRadius: '12px' }}
                        />
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock" style={{ color: '#667eea' }}></i>
                        </span>
                    </div>
                </div>

                    <div className="field mb-5">
                    <div className="control has-icons-left">
                        <input
                        className="input is-medium"
                        type="password"
                        placeholder="Konfirmasi Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ borderRadius: '12px' }}
                        />
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock" style={{ color: '#667eea' }}></i>
                        </span>
                    </div>
                    </div>


                  <div className="field">
                    <button
                      type="submit"
                      className="button is-fullwidth is-medium"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: '600'
                      }}
                    >
                      <span className="icon"><i className="fas fa-save"></i></span>
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </form>
                <button
                    type="button"
                    className="button is-light is-fullwidth"
                    style={{ borderRadius: '12px', border: '1px solid #ccc' }}
                    onClick={handleBack} // ← di sini fungsi handleBack dipakai
                    >
                    <span className="icon"><i className="fas fa-arrow-left"></i></span>
                    <span>Kembali ke Profil</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default EditProfilePage;
