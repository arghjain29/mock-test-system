import mongoose, { Schema, Document, Types } from "mongoose";
import { IQuestion } from "./question.model";

export interface IMockTest extends Document {
  userId: Types.ObjectId;
  questions: (IQuestion | Types.ObjectId)[];
  startTime: Date;
  endTime?: Date;
  score?: number;
}

const MockTestSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true }],
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  score: { type: Number },
});

export default mongoose.model<IMockTest>("MockTest", MockTestSchema);
