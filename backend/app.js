import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import { config } from "dotenv";
import cors from "cors";

const app = express();
config();

// hello
app.use(cors(
  {
    origin: ["https://simulator-dev-frontend.vercel.app"],
    methods: ["POST", "GET"], 
    credentials: true
  }
));

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
app.use("/", (req,res) => {
  res.send("<h1>Hello</h1>");
  res.end();
})
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong.";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

(async () => {
  const port = process.env.PORT || 8080;
  const res = await mongoose.connect(process.env.mongoUrl);
  console.log("connected");
  app.listen(port);
})();
