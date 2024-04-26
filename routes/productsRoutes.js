import { Router } from "express";
import { getProduct, getProducts } from "../controllers/productsController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
