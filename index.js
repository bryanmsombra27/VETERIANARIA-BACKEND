import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(json());
app.use(cors());
conectarDB();

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO:${port}`);
});
