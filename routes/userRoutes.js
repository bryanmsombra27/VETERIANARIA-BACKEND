import { Router } from "express";
import {
  createUsers,
  getUserProfile,
  getUsers,
  login,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, admin, getUsers);
router.post("/", protect, admin, createUsers);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/:id", protect, admin, getUsers);
router.put("/:id", protect, admin, getUsers);
router.delete("/:id", protect, admin, getUsers);

export default router;
