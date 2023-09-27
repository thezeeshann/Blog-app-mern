import express from "express";
import authenticateJwt from "../middleware/auth.js";
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

router.get("/getAllBlog", getAllBlog);
router.get("/getSingleBlog/:id", getSingleBlog);
router.post("/createBlog",authenticateJwt, createBlog);
router.put("/updateBlog",authenticateJwt, updateBlog);
router.delete("/deleteBlog",authenticateJwt, deleteBlog);

// comments
router.get("/getAllComments", getAllComments);
router.post("/createComment",authenticateJwt, createComment);
router.delete("/deleteComment",authenticateJwt, deleteComments);

export default router;
