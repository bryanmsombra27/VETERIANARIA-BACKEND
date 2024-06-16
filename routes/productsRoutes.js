import { Router } from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productsController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProduct);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
