import express from "express";
import {
  CreateBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/create", CreateBlog);
router.get("", getAllBlog);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
