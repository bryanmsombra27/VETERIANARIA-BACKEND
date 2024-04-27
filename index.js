import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

conectarDB();

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO:${port}`);
});
