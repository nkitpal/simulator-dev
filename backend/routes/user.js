import { Router } from "express";
import { body } from "express-validator";
import { signup, login, saveCode } from "../controllers/auth.js";
import User from "../models/user.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

const signupValidators = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("should be of min 3 length"),
  body("urn")
    .trim()
    .isLength({ min: 8 })
    .withMessage("should be of min 8 length"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("invalid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already exists");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password must be of min 5 length"),
];

router.put("/signup", signupValidators, signup);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("invalid email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("password must be of min 5 length"),
  ],
  login
);

router.post(
  "/save-code",
  isAuth,
  [body("code").trim().notEmpty().withMessage("Code is Empty")],
  saveCode
);

export default router;
