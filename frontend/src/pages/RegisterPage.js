import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Utils"; // Ganti sesuai endpoint backend kamu

const RegisterPage = () => {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password tidak sama !");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Masukkan email yang valid !");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/register`, {
        name: name,
        email,
        password,
        role: "user", // nilai dari input hidden
      });
      navigate("/login");
      console.log("Register attempt:", { name, email, password, role: "user" });
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || "Registrasi gagal !");
    }
  };

  return (
    <div className="hero is-fullheight" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '180px',
        height: '180px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '80%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              {/* Register Card */}
              <div className="box" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                padding: '3rem'
              }}>
                {/* Header */}
                <div className="has-text-centered mb-5">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                  }}>
                    <i className="fas fa-user-plus" style={{ fontSize: '2rem', color: 'white' }}></i>
                  </div>
                  <h1 className="title is-3 has-text-dark mb-2">Buat Akun Baru</h1>
                  <p className="subtitle is-6 has-text-grey">Bergabunglah dengan kami hari ini</p>
                </div>

                <div onSubmit={handleRegister}>
                  {/* Error Message */}
                  {errorMsg && (
                    <div className="notification is-danger is-light mb-4" style={{
                      borderRadius: '12px',
                      border: '1px solid #f14668',
                      backgroundColor: 'rgba(241, 70, 104, 0.1)'
                    }}>
                      <button 
                        className="delete" 
                        onClick={() => setErrorMsg("")}
                        type="button"
                      ></button>
                      <strong>Error:</strong> {errorMsg}
                    </div>
                  )}

                  {/* Name Field */}
                  <div className="field mb-4">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Nama Lengkap"
                        value={name}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e8e8e8',
                          transition: 'all 0.3s ease',
                          fontSize: '1rem'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 0.125em rgba(102, 126, 234, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e8e8e8';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="field mb-4">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e8e8e8',
                          transition: 'all 0.3s ease',
                          fontSize: '1rem'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 0.125em rgba(102, 126, 234, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e8e8e8';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="field mb-4">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        required
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e8e8e8',
                          transition: 'all 0.3s ease',
                          fontSize: '1rem'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 0.125em rgba(102, 126, 234, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e8e8e8';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="field mb-5">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Konfirmasi Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e8e8e8',
                          transition: 'all 0.3s ease',
                          fontSize: '1rem'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 0.125em rgba(102, 126, 234, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e8e8e8';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-shield-alt" style={{ color: '#667eea' }}></i>
                      </span>
                    </div>
                  </div>

                  {/* Hidden Role Field */}
                  <input type="hidden" name="role" value="user" />

                  {/* Register Button */}
                  <div className="field">
                    <div className="control">
                      <button 
                        className="button is-fullwidth is-medium"
                        type="submit"
                        onClick={handleRegister}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '0.75rem 1.5rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                      >
                        <span className="icon">
                          <i className="fas fa-check-circle"></i>
                        </span>
                        <span>Daftar Sekarang</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login Link */}
                <div className="has-text-centered mt-5">
                  <p className="has-text-grey">
                    Sudah punya akun?{" "}
                    <Link
                      to="/login" 
                      style={{
                        color: '#667eea',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#764ba2';
                        e.target.style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#667eea';
                        e.target.style.textDecoration = 'none';
                      }}
                    >
                      Masuk di sini
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .hero {
          min-height: 100vh;
        }
        
        .box:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        
        .notification.is-danger.is-light {
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;