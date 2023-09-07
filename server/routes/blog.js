import express from "express";
import {
  CreateBlog,
<<<<<<< HEAD
  getAllBlog,
  getSingleBlog,
  updateBlog,
=======
  getAllBlogs,
  updateBlogs,
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/create", CreateBlog);
<<<<<<< HEAD
router.get("", getAllBlog);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
=======
router.get("", getAllBlogs);
router.put("/:id", updateBlogs);
>>>>>>> 6eaa43a12979ac01fb4081df42794ddc134357f9
router.delete("/:id", deleteBlog);

export default router;
