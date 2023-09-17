import express from "express";
import {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getAllComments,
  deleteComments
} from "../controllers/blog.js";

const router = express.Router();

router.post("/createBlog", createBlog);
router.get("/getAllBlog", getAllBlog);
router.get("/getSingleBlog/:id", getSingleBlog);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);
// comments
router.get("/getAllComments", getAllComments);
router.post("/createComment", createComment);
router.delete("/deleteComment", deleteComments);

export default router;
