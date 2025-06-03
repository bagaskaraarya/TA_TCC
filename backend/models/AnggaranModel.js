import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Anggaran = db.define("anggaran", {
  keterangan: Sequelize.STRING,
  jumlah: Sequelize.INTEGER,
  harga: Sequelize.INTEGER,
  total_harga: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  freezeTableName: true
});

Anggaran.beforeCreate((anggaran) => {
  anggaran.total_harga = anggaran.jumlah * anggaran.harga;
});

Anggaran.beforeUpdate((anggaran) => {
  anggaran.total_harga = anggaran.jumlah * anggaran.harga;
});

export default Anggaran;
