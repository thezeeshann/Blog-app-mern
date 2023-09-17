import BlogModal from "../models/Blog.js";
import CommentModal from "../models/Comment.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

import * as dotenv from "dotenv";
dotenv.config();

const createBlog = async (req, res) => {
  try {
    const image = req.files.image;
    const { title, category, description, comments, user } = req.body;

    if (!title || !category || !description || !user) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const blog = await BlogModal.create({
      title,
      image: uploadImage.secure_url,
      category,
      description,
      comments,
      user,
    });

    const updatedBlog = await BlogModal.findByIdAndUpdate(
      blog,
      { $push: { user: blog._id, comments: blog._id } },
      { new: true }
    )
      .populate("user")
      .populate("comments")
      .exec();

    //console.log(updatedBlog)

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create post",
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModal.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User", // The name of the User model
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blogs not found",
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogDetails = await BlogModal.findOne({
      _id: blogId,
    })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User", // The name of the User model
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      blogDetails,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const updateBlog = await BlogModal.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });
    if (!updateBlog) {
      return res.status(404).json({
        success: false,
        message: `No Blog with ${blogId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      updateBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Blogs not found",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    const deleteBlog = await BlogModal.findByIdAndDelete(blogId);

    if (!deleteBlog) {
      return res.status(404).json({
        success: false,
        message: `No Blog with ${blogId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "unable to delete blogs",
    });
  }
};

// comments
const createComment = async (req, res) => {
  try {
    const { comment, blog, user } = req.body;
    if (!comment || !blog || !user) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const commentDoc = await CommentModal.create({
      comment,
      blog,
      user,
    });

    await BlogModal.findByIdAndUpdate(
      blog,
      {
        $push: { comments: commentDoc._id },
      },
      { new: true }
    );
    await BlogModal.findByIdAndUpdate(
      user,
      {
        $push: { user: commentDoc._id },
      },
      { new: true }
    );

    const populatedComment = await CommentModal.findById(commentDoc._id)
      .populate("blog")
      .populate("user")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Comment create successfully",
      commentDoc: populatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create comment",
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModal.find()
      .populate("user")
      .populate("blog")
      .exec();
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Comments not found",
    });
  }
};

const deleteComments = async (req, res) => {
  try {
    const { commentId } = req.body;
    const deleteComment = await CommentModal.findByIdAndDelete(commentId);
    if (!deleteComment) {
      return res.status(404).json({
        success: false,
        message: `No comment with ${commentId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Unable to delete comments",
    });
  }
};

export {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getAllComments,
  deleteComments,
};
