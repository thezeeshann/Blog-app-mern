import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import * as dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if ((!firstName || !lastName || !email || !password, !confirmPassword)) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(404).json({
        message: "Password does not match",
      });
    }
    const validEmail = validator.isEmail(req.body.email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(404).json({
        success: false,
        message: "User Already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be register",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existsUser = await UserModel.findOne({ email });
    if (!existsUser) {
      return res.status(404).json({
        success: false,
        message: "User doest not exists",
      });
    }

    if (await bcrypt.compare(password, existsUser.password)) {
      const payload = {
        userId: existsUser._id,
        email: existsUser.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      existsUser.token = token;

      // set cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login Successful",
        token,
        existsUser,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const getAllUserDetails = async (req, res) => {
  try {
    const id = req.existsUser.userId
    const user = await UserModel.findById(id)
    return res.status(200).json({
      success: true,
      data:user,
    });
  } catch (error) {
    return (
      res.status(404).json({
        success:false,
        message: error.message,
      })
    );
  }
};


export { signup, login, logout, getAllUserDetails };
