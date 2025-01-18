import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import mockTestRoutes from "./routes/mockTest.routes";
import questionRoutes from "./routes/question.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/mock-test", mockTestRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

