import { RequestHandler } from "express";
import MockTest, { IMockTest } from "../models/mockTest.model";
import Question, { IQuestion } from "../models/question.model";
import User, { IUser } from "../models/user.model";

// Fetch questions for a mock test
export const getMockTestQuestions: RequestHandler = async (req, res) => {
  const { numQuestions, difficulty, tags } = req.body;
  const { userId } = req.body.user;

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const questions: IQuestion[] = await Question.find({
      _id: { $nin: user.attemptedQuestions },
      ...(difficulty && { difficulty }),
      ...(tags && { tags: { $in: tags } }),
    }).limit(numQuestions);

    // Check if there are no remaining questions for the user
    if (questions.length === 0) {
      res.status(400).json({ message: "No questions left to attempt" });
      return;
    }

    if (questions.length < numQuestions) {
      res.status(400).json({ message: "Not enough questions available" });
      return;
    }

    const mockTest: IMockTest = await MockTest.create({
      userId,
      questions: questions.map((q) => q._id),
      startTime: new Date(),
    });

    await User.findByIdAndUpdate(userId, {
      $push: { attemptedQuestions: { $each: questions.map((q) => q._id) } },
    });

    res.status(200).json({ mockTestId: mockTest._id, questions });
  } catch (error) {
    console.error("Error fetching mock test questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Submit a completed mock test
export const submitMockTest: RequestHandler = async (req, res) => {
  const { mockTestId, answers } = req.body;
  
  if(!answers || answers.length === 0) {
    res.status(400).json({ message: "Answers are required" });
    return;
  }
  
  try {
    const mockTest: IMockTest | null = await MockTest.findById(
      mockTestId
    ).populate<{
      questions: IQuestion[];
    }>("questions");

    if (!mockTest) {
      res.status(404).json({ message: "Mock test not found" });
      return;
    }

    const questions: IQuestion[] = mockTest.questions as IQuestion[];
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) score++;
    });

    mockTest.endTime = new Date();
    mockTest.score = score;
    await mockTest.save();

    res.status(200).json({ score });
  } catch (error) {
    console.error("Error submitting mock test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch test history for a user
export const getUserTestHistory: RequestHandler = async (req, res) => {
  const { userId } = req.body.user;

  try {
    const mockTests: IMockTest[] = await MockTest.find({ userId }).populate(
      "questions"
    );
    res.status(200).json(mockTests);
  } catch (error) {
    console.error("Error fetching user test history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
