import express from "express";
import {
    getAllAnggaran,
    getAnggaranById,
    updateAnggaran,
    deleteAnggaran,
    addAnggaran,
} from "../controllers/AnggaranController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js"; 

const router = express.Router();

// endpoint untuk mendapatkan refresh token
router.get('/token', refreshToken);

// GET semua Anggaran
router.get("/anggaran", verifyToken, getAllAnggaran);

// GET Anggaran berdasarkan id
router.get("/anggaran/:id", verifyToken, getAnggaranById);

// POST tambah Anggaran baru
router.post("/add-anggaran", verifyToken, addAnggaran);

// PUT update Anggaran berdasarkan id
router.put("/update-anggaran/:id", verifyToken, updateAnggaran);

// DELETE hapus anggaran berdasarkan id
router.delete("/delete-anggaran/:id", verifyToken, deleteAnggaran);

export default router;