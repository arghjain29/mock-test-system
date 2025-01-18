import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }
    const decoded = jwt.verify(token as string, secret);
    req.body.user = decoded; // Attach decoded user information to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
