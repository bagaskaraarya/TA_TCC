import { useState } from "react";
import useAuth from "../auth/UseAuth.js";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
      console.log("Login attempt:", email, password);
    } catch (err) {
      alert("Login gagal: " + err.response?.data?.message || "Terjadi kesalahan.");
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
        top: '20%',
        left: '15%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              {/* Login Card */}
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
                    <i className="fas fa-lock" style={{ fontSize: '2rem', color: 'white' }}></i>
                  </div>
                  <h1 className="title is-3 has-text-dark mb-2">Selamat Datang</h1>
                  <p className="subtitle is-6 has-text-grey">Masuk ke akun Anda untuk melanjutkan</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="field mb-5">
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
                  <div className="field mb-5">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {/* Login Button */}
                  <div className="field">
                    <div className="control">
                      <button 
                        className="button is-fullwidth is-medium"
                        type="submit"
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
                          <i className="fas fa-sign-in-alt"></i>
                        </span>
                        <span>Masuk</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Register Link */}
                <div className="has-text-centered mt-5">
                  <p className="has-text-grey">
                    Belum punya akun?{" "}
                    <Link
                      to="/register"
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
                      Daftar di sini
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
      `}</style>
    </div>
  );
}