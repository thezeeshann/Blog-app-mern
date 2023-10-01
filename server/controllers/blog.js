import BlogModal from "../models/Blog.js";
import CommentModal from "../models/Comment.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";
import * as dotenv from "dotenv";
dotenv.config();

const createBlog = async (req, res) => {
  console.log("outside the blog");
  try {
    const userId = req.existsUser.userId;
    const image = req.files.image;
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image field are required",
      });
    }
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
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
      user: userId,
    });

    const updatedBlog = await BlogModal.findOne({ _id: blog })
      .populate("user")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create blog",
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModal.find().populate("user").exec();
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
    const blogDetails = await BlogModal.findById({ _id: blogId })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          modal: "User",
        },
      })
      .exec();
    if (!blogDetails) {
      return res.status(404).json({
        return: true,
        message: "Blog Id not found",
      });
    }
    return res.status(200).json({
      success: true,
      blogDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const updates = req.body;
    const userId = req.existsUser.userId;

    // Find the blog by ID and check if it exists
    const blog = await BlogModal.findById({ _id: blogId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `No Blog with ${blogId}`,
      });
    }

    // Check if the authenticated user is the owner of the blog
    if (blog.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog.",
      });
    }

    // if image found update it
    if (req.files) {
      const image = req.files.image;
      const blogImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
      );
      blog.image = blogImage.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        blog[key] = updates[key];
      }
    }

    await blog.save();

    const updatedBlog = await BlogModal.findOne({
      _id: blogId,
    })
      .populate("user")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the blog",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.existsUser.userId;
    const blog = await BlogModal.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `No Blog with ${blogId}`,
      });
    }

    if (blog.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog.",
      });
    }

    // delete the comment with this blog related
    if (blog.comments.length > 0) {
      for (const comment of blog.comments) {
        await CommentModal.findByIdAndDelete(comment._id);
      }
    }

    await BlogModal.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog and related comments deleted successfully",
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
    const userId = req.existsUser.userId;
    const { comment, blogId } = req.body;

    if (!comment || !userId || !blogId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const commentDoc = await CommentModal.create({
      comment,
      user: userId,
      blog: blogId,
    });

    const updatedComment = await BlogModal.findOneAndUpdate(
      {
        _id: blogId,
      },
      {
        $push: { comments: commentDoc._id },
      },
      { new: true }
    )
      .populate("user")
      .populate("comments")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: updatedComment,
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
    const userId = req.existsUser.userId;

    const comment = await CommentModal.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: `No comment with ID ${commentId}`,
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    const deleteComment = await CommentModal.findByIdAndDelete(commentId);

    if (!deleteComment) {
      return res.status(404).json({
        success: false,
        message: `No comment with ID ${commentId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete comment",
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
