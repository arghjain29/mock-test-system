import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id",authMiddleware, updateUser);
router.delete("/:id",authMiddleware, deleteUser);

export default router;
