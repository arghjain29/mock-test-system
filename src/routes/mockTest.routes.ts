import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  getMockTestQuestions,
  submitMockTest,
  getUserTestHistory,
} from "../controllers/mockTest.controller";

const router = express.Router();

router.post("/get-questions",authMiddleware, getMockTestQuestions);
router.post("/submit-test",authMiddleware, submitMockTest);
router.get("/history",authMiddleware, getUserTestHistory);

export default router;
