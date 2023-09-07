import mongoose from "mongoose";
import validator from "validator";
<<<<<<< HEAD
=======
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../email/emailVerificationTemplate.js";
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      mix: 4,
      max: 50,
    },
    lastName: {
      type: String,
      mix: 4,
      max: 50,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
