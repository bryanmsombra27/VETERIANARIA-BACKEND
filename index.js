//DEPENDENCIES
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

///DB CONNECTION
import conectarDB from "./config/db.js";

//ROUTES
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
// app.use("/uploads", express.static(path.resolve(__dirname, "/uploads")));
app.use("/uploads", express.static(__dirname + "/uploads"));
conectarDB();
console.log(__dirname + "/uploads", "UPLOADS PATH");
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO:${port}`);
});
