import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import KegiatanKerjaRoute from "./routes/KegiatanKerjaRoute.js";
import AnggaranRoute from "./routes/AnggaranRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  cors({
    origin: "https://praktcc-460915.uc.r.appspot.com", // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(KegiatanKerjaRoute); 
app.use(AnggaranRoute);  

app.listen(5000, () => console.log("Server connected"));