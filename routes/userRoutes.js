import { Router } from "express";
import {
  createUsers,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  login,
  logoutUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, admin, getUsers);
// router.post("/", protect, admin, createUsers);
router.post("/", createUsers);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUser);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id", protect, admin, updateUser);

export default router;
