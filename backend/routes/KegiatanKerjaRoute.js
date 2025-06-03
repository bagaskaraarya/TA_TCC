import express from "express";
import {
  getAllKegiatanKerja,
  getKegiatanKerjaById,
  addKegiatanKerja,
  updateKegiatanKerja,
  deleteKegiatanKerja,
  getKegiatanKerjaByUserId
} from "../controllers/KegiatanKerjaController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// endpoint untuk mendapatkan refresh token
router.get('/token', refreshToken);

// GET semua kegiatan kerja
router.get("/kegiatan-kerja", verifyToken, getAllKegiatanKerja);

// GET semua kegiatan kerja
router.get("/kegiatan-kerja/user/:userId", verifyToken, getKegiatanKerjaByUserId);

// GET kegiatan kerja berdasarkan id
router.get("/kegiatan-kerja/:id", verifyToken, getKegiatanKerjaById);

// POST tambah kegiatan kerja baru
router.post("/add-kegiatan-kerja", verifyToken, addKegiatanKerja);

// PUT update kegiatan kerja berdasarkan id
router.put("/update-kegiatan-kerja/:id", verifyToken, updateKegiatanKerja);

// DELETE hapus kegiatan kerja berdasarkan id
router.delete("/delete-kegiatan-kerja/:id", verifyToken, deleteKegiatanKerja);

export default router;
