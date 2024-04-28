import { Router } from "express";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/ordersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

//ADMIN FUNCTIONALITY
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, admin, getOrderById);
router.get("/:id/delivered", protect, admin, updateOrderToDelivered);

//USER FUNCTIONALITY
router.post("/", protect, addOrderItems);
router.get("/mine", protect, getMyOrders);
router.get("/:id/pay", protect, updateOrderToPaid);

export default router;
