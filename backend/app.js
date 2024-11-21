import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import { config } from "dotenv";

const app = express();
config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong.";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

(async () => {
  const res = await mongoose.connect(process.env.mongoUrl);
  console.log("connected");
  app.listen(8080);
})();