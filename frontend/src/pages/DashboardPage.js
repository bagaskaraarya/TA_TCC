import { useAuthContext } from "../auth/AuthProvider";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt", path: "/dashboard" },
  { id: "rancangan-kerja", label: "Rancangan Kerja", icon: "fas fa-tasks", path: "/dashboard/rancangan-kerja" },
  { id: "profil", label: "Profil", icon: "fas fa-user", path: "/dashboard/profil" }
];

  useEffect(() => {
    const segment = location.pathname.split("/")[2] || "dashboard";
    setActiveMenu(segment);
  }, [location]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{
        width: "280px",
        background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "4px 0 20px rgba(102, 126, 234, 0.15)",
        position: "fixed",
        height: "100vh",
        zIndex: 1000
      }}>
        <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
          <div style={{
          }}>
            <i className="fas fa-chart-line" style={{ fontSize: "1.8rem", color: "white" }}></i>
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "white", margin: 0 }}>
            Sistem RKA
          </h3>
        </div>

        <nav style={{ padding: "1.5rem 0" }}>
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem 1.5rem",
                textDecoration: "none",
                background: activeMenu === item.id ? "rgba(255, 255, 255, 0.15)" : "transparent",
                color: "white",
                fontSize: "1rem",
                fontWeight: activeMenu === item.id ? "600" : "500",
                borderLeft: activeMenu === item.id ? "4px solid #ffffff" : "4px solid transparent",
                transition: "all 0.3s ease"
              }}
            >
              <span style={{ marginRight: "12px" }}>
                <i className={item.icon}></i>
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ marginLeft: "280px", flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{
          background: "#ffffff",
          padding: "1.5rem 2rem",
          borderBottom: "1px solid #e8e8e8",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 999
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#363636", margin: "0 0 0.5rem 0" }}>
                <span style={{ marginRight: "10px" }}>
                  <i className="fas fa-tachometer-alt" style={{ color: "#667eea" }}></i>
                </span>
                Dashboard
              </h1>
              <p style={{ fontSize: "1rem", color: "#4a4a4a", margin: 0 }}>
                Selamat datang, <strong style={{ color: "#667eea" }}>{user?.name || "Pengguna"}</strong>
                {user?.role && (
                  <>
                    <span style={{ margin: "0 8px", color: "#e8e8e8" }}>•</span>
                    <span style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {user.role}
                    </span>
                  </>
                )}
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                borderRadius: "12px",
                fontWeight: "600",
                padding: "0.75rem 1.5rem",
                border: "2px solid #e8e8e8",
                background: "#ffffff",
                color: "#4a4a4a",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.12)";
                e.target.style.borderColor = "#667eea";
                e.target.style.color = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.color = "#4a4a4a";
              }}
            >
              <span style={{ marginRight: "8px" }}>
                <i className="fas fa-sign-out-alt"></i>
              </span>
              Logout
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f8f9fa" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
