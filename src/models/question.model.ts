import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
}

const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  tags: { type: [String], default: [] },
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);
