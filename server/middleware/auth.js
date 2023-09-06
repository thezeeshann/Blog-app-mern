import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const authenticateJwt = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode, "verify token");
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "wrong while verify the token",
      });
    }
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "token is invalid",
    });
  }
};

export default authenticateJwt;
