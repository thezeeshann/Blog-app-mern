import express from "express";
import {
  CreateBlog,
  getAllBlogs,
  updateBlogs,
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/create", CreateBlog);
router.get("", getAllBlogs);
router.put("/:id", updateBlogs);
router.delete("/:id", deleteBlog);

export default router;
