// controllers/AnggaranController.js
import Anggaran from "../models/AnggaranModel.js";

// GET semua anggaran
export const getAllAnggaran = async (req, res) => {
  try {
    const data = await Anggaran.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// GET anggaran berdasarkan ID
export const getAnggaranById = async (req, res) => {
  try {
    const anggaran = await Anggaran.findOne({
      where: { id: req.params.id },
    });

    if (!anggaran) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(anggaran);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// CREATE anggaran
export const addAnggaran = async (req, res) => {
  try {
    const { keterangan, jumlah, harga } = req.body;

    if (!keterangan || !jumlah || !harga) {
      return res.status(400).json({
        message: "Field keterangan, jumlah, dan harga wajib diisi",
      });
    }

    const data = await Anggaran.create({ keterangan, jumlah, harga });

    res.status(201).json({
      status: "Success",
      message: "Data anggaran berhasil ditambahkan",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// UPDATE anggaran
export const updateAnggaran = async (req, res) => {
  try {
    const { keterangan, jumlah, harga } = req.body;
    const anggaran = await Anggaran.findByPk(req.params.id);

    if (!anggaran) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await anggaran.update({ keterangan, jumlah, harga });

    res.status(200).json({
      status: "Success",
      message: "Data anggaran berhasil diperbarui",
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// DELETE anggaran
export const deleteAnggaran = async (req, res) => {
  try {
    const anggaran = await Anggaran.findByPk(req.params.id);
    if (!anggaran) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await anggaran.destroy();
    res.status(200).json({ status: "Success", message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
