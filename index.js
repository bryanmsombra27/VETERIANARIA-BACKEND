import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
// import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(json());
app.use(cors());
conectarDB();

// app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/products", productsRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO:${port}`);
});
