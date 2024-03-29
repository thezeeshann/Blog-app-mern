import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const authenticateJwt = (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token || token === undefined) {
      return res.status(404).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.existsUser = decode

    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong while verify the token",
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
