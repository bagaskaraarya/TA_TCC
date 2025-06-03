import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const KegiatanKerja = db.define("rencana_kerja", {
  nama_kegiatan: Sequelize.STRING,
  deskripsi: Sequelize.TEXT,
  tanggal: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

export default KegiatanKerja;
