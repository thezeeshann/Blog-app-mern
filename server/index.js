import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js"
import blogRoute from "./routes/blog.js"
import connectDB from "./config/db.js";
import cors from "cors"
import fileUpload from "express-fileupload";
import cloudinaryConnect from "./config/Cloudinary.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// database
connectDB()
cloudinaryConnect()
app.use(express.json())
app.use(fileUpload({
	useTempFiles : true,
    tempFileDir : '/tmp'
}))
app.use(cookieParser())
app.use(cors())
// routes
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/blog",blogRoute)


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
