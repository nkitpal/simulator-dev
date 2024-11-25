import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { compare, hash } from "bcrypt";
import { config } from "dotenv";
import User from "../models/user.js";
import { googleConfig } from "../utils/googleConfig.js";

config();
export const signup = async (req, res, next) => {
  console.log("a");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const inputName = req.body.name;
    const inputUrn = req.body.urn;
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    const hashedPw = await hash(inputPassword, 12);

    const newUser = new User({
      name: inputName,
      urn: inputUrn,
      email: inputEmail,
      password: hashedPw,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new Error("Could not save product into db");
    }

    res.status(201).json({ message: "New user created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    const user = await User.findOne({ email: inputEmail });

    if (!user) {
      const error = new Error("Please signup!");
      error.statusCode = 401;
      error.data = [{ msg: "Either email is incorrect or not signed up yet" }];
      throw error;
    }

    const doMatch = await compare(inputPassword, user.password);

    if (!doMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      error.data = [{ msg: "Incorrect Password" }];
      throw error;
    }

    const token = jwt.sign(
      { email: inputEmail, userId: user._id.toString() },
      process.env.tokenSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Successfully Logged in",
      userData: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { code } = req.body;
    const googleRes = await googleConfig.getToken(code);
    googleConfig.setCredentials(googleRes.tokens);
    const response = await fetch(
      ` https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("could not get response");
    }

    const resData = await response.json();
    if (!resData) {
      throw new Error("login with google error");
    }

    const { email, name } = resData;

    console.log(email)

    if (!email.endsWith("@newtonschool.co")) {
      throw new Error("Invalid Email Domain");
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name,
      });
      const savedUser = await user.save();
      if (!savedUser) {
        throw new Error("Could not save product into db");
      }
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.tokenSecret,
      { expiresIn: "4h" }
    );

    res.status(200).json({
      message: "Successfully Logged in",
      userData: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const saveCode = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const user = await User.findById(req.userId);

    if (!user) {
      const err = new Error("User not found!");
      err.statusCode = 401;
      throw err;
    }

    user.code = req.body.code;
    user.error = "";

    const savedUser = await user.save();
    if (!savedUser) {
      const err = new Error("Could not update address into user");
      err.statusCode = 404;
      throw err;
    }

    res.status(201).json({
      message: "code saved successfully",
      individualCoder: savedUser,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const coder = await User.find();

    if (!coder) {
      const err = new Error("Could not fetch coders");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      message: "Successfully Retrieved coders",
      coder,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
