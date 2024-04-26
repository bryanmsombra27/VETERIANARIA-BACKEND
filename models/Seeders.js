import mongoose from "mongoose";
import users from "../data/users.js";
import products from "../data/products.js";
import User from "./User.js";
import Product from "./Product.js";
import Order from "./Order.js";
import conectarDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

conectarDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(users, "USUARIOS SAMPLE DATA ");

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit();
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("DATA DELETED SUSCCESSSFULLY");
    process.exit();
  } catch (error) {
    console.log(error, "DELETE ERROR");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
