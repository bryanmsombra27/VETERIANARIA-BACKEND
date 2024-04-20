import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {});
    console.log("DB CONECTADA");
  } catch (error) {
    console.log(error, "error en la conexion");
    process.exit(1);
  }
};

export default conectarDB;
