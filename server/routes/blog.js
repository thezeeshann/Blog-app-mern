import express from "express";
import {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.js";
import { createComment,getAllComments } from "../controllers/blog.js";

const router = express.Router();

router.post("/createBlog", createBlog);
router.post("/createComment", createComment);
router.get("/getAllBlog", getAllBlog);
router.get("/getAllComments", getAllComments);
router.get("/getSingleBlog/:id", getSingleBlog);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);

export default router;
