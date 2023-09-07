import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully")
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};


export default connectDB