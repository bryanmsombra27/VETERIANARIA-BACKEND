//DEPENDENCIES
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

///DB CONNECTION
import conectarDB from "./config/db.js";

//ROUTES
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
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

conectarDB();

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO:${port}`);
});
