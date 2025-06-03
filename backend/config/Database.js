import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

//menyambungkan ke database
const db = new Sequelize('projectTCC','root','',{
    host : '34.60.53.131',
    dialect : "mysql"
});

export default db;