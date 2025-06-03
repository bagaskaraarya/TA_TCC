import sequelize, { Sequelize } from "sequelize";
import db from "../config/Database.js";
import KegiatanKerja from "./KegiatanKerjaModel.js";

const User = db.define(
    "user",
    {
    name : Sequelize.STRING,
        email : {
            type : Sequelize.STRING, unique : true
        },
        password : Sequelize.STRING,
        role : {
            type : Sequelize.ENUM('admin', 'user'),
            defaultValue : 'user',
        },
        refresh_token: {
            type: Sequelize.TEXT,
            allowNull: true,
            field: "refresh_token"
        }
    },
    {
        freezeTableName : true,
        timestamps : true,
    }

);

User.hasMany(KegiatanKerja, { foreignKey: "userId" });
KegiatanKerja.belongsTo(User, { foreignKey: "userId" });

export default User;