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
router.get("/:id/delivered", protect, admin, updateOrderToDelivered);

//USER FUNCTIONALITY
router.get("/myOrders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.post("/", protect, addOrderItems);
router.put("/:id/pay", protect, updateOrderToPaid);

//PAYPAL API
router.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

export default router;
