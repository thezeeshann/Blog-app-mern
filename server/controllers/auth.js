import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      return res.status().json({
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
        expiresIn: "1h",
      });

      existsUser.token = token;

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
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

export { signup, login };
