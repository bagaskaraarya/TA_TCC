import User from "../models/UserModel.js";
import KegiatanKerja from "../models/KegiatanKerjaModel.js";

// GET semua kegiatan kerja
export const getAllKegiatanKerja = async (req, res) => {
  try {
    const data = await KegiatanKerja.findAll({
      include: [User],
      order: [['tanggal', 'DESC']]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// GET kegiatan kerja by ID
export const getKegiatanKerjaById = async (req, res) => {
  try {
    const kegiatan = await KegiatanKerja.findOne({
      where: { id: req.params.id },
      include: [User]
    });
    if (!kegiatan) return res.status(404).json({ message: "Data tidak ditemukan" });

    res.status(200).json(kegiatan);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// CREATE kegiatan kerja
export const addKegiatanKerja = async (req, res) => {
  try {
    const { nama_kegiatan, deskripsi, tanggal, userId } = req.body;

    if (!nama_kegiatan || !deskripsi || !tanggal || !userId) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const newData = await KegiatanKerja.create({
      nama_kegiatan,
      deskripsi,
      tanggal,
      userId,
    });

    res.status(201).json({
      status: "Success",
      message: "Rencana Kerja berhasil ditambahkan",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// UPDATE kegiatan kerja
export const updateKegiatanKerja = async (req, res) => {
  try {
    const { nama_kegiatan, deskripsi, tanggal } = req.body;
    const kegiatan = await KegiatanKerja.findByPk(req.params.id);

    if (!kegiatan) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await kegiatan.update({
      nama_kegiatan,
      deskripsi,
      tanggal
    });

    res.status(200).json({ status: "Success", message: "Rencana Kerja berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// DELETE kegiatan kerja
export const deleteKegiatanKerja = async (req, res) => {
  try {
    const kegiatan = await KegiatanKerja.findByPk(req.params.id);
    if (!kegiatan) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await kegiatan.destroy();
    res.status(200).json({ status: "Success", message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// GET kegiatan kerja berdasarkan userId
export const getKegiatanKerjaByUserId = async (req, res) => {
  try {
    const data = await KegiatanKerja.findAll({
      where: { userId: req.params.userId },
      include: [User],
      order: [['tanggal', 'DESC']]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
