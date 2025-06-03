import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./auth/AuthProvider";

// Halaman Umum
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";

// Halaman Dashboard & Fitur
import DashboardLayout from "./pages/DashboardPage.js";
import ProfilPage from "./pages/ProfilPage.js";
import RancanganKerjaPage from "./pages/RancanganKerjaPage.js";
import RKAOverview from "./pages/RKAoverview.js";
import CreateRencanaKerja from "./pages/CreateRencanaKerja.js";
import EditRencanaKerja from "./pages/EditRencanaKerja.js";
import AnggaranPage from "./pages/AnggaranPage.js";
import CreateAnggaranPage from "./pages/CreateAnggaranPage.js";
import EditAnggaranPage from "./pages/EditAnggaranPage.js";
import EditProfilePage from "./pages/EditUserPage.js";

// Admin Only
import AccountPage from "./pages/AccountPage.js";
import RequireAdmin from "./auth/RequireAdmin.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { accessToken } = useAuthContext();
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Layout Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<RKAOverview />} />
        <Route path="profil" element={<ProfilPage />} />
        <Route path="rancangan-kerja" element={<RancanganKerjaPage />} />
      </Route>

      {/* Fitur Rencana Kerja & Anggaran */}
      <Route path="/rencana-kerja/create" element={<CreateRencanaKerja />} />
      <Route path="/edit-rencana-kerja/:id" element={<EditRencanaKerja />} />
      <Route path="/anggaran" element={<AnggaranPage />} />
      <Route path="/anggaran/create" element={<CreateAnggaranPage />} />
      <Route path="/anggaran/edit/:id" element={<EditAnggaranPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />

      {/* Halaman Admin (dilindungi oleh RequireAdmin) */}
      <Route path="/akun" element={<RequireAdmin><AccountPage /></RequireAdmin>} />
      <Route path="/unauthorized" element={<div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>Akses ditolak: Hanya admin yang dapat mengakses halaman ini.</div>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
