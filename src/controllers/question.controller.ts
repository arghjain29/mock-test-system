import { RequestHandler } from "express";
import Question, { IQuestion } from "../models/question.model";

// Create a new question
export const createQuestion: RequestHandler = async (req, res) => {
  const { text, options, correctAnswer, difficulty, tags } = req.body;

  try {
    if (!text || !options || !correctAnswer || !difficulty || !tags) {
      res.status(400).json({ message: "All fields are required" });
      return;}
    const existingQuestion = await Question.findOne({ text });
    if (existingQuestion) {
      res.status(400).json({ message: "Question already exists" });
      return;
    }  
    const question = new Question({ text, options, correctAnswer, difficulty, tags });
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all questions
export const getAllQuestions: RequestHandler = async (req, res) => {
  try {
    const questions = await Question.find();
    if(questions.length === 0) {
      res.status(404).json({ message: "No questions found" });
      return;
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single question by ID
export const getQuestionById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a question by ID
export const updateQuestion: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedQuestion) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a question by ID
export const deleteQuestion: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
