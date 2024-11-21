import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export default (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = new Error("No authorization header sent!");
    err.statusCode = 401;
    throw err;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.tokenSecret);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }

  if (!decodedToken) {
    const err = new Error("Malicious token");
    err.statusCode = 401;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
};
