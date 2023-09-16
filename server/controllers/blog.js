import BlogModal from "../models/Blog.js";
import CommentModal from "../models/Comment.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";
import * as dotenv from "dotenv";
dotenv.config();

const createBlog = async (req, res) => {
  try {
    const image = req.files.image;
    const { title, category, description, comments, user } = req.body;

    if (!title || !category || !description || !comments) {
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

    console.log("create comment");

    await BlogModal.findByIdAndUpdate(blog, {
      $push: { comments: commentDoc._id },
    });
    await BlogModal.findByIdAndUpdate(user, {
      $push: { user: commentDoc._id },
    });

    // const updatedComment = await CommentModal.findByIdAndUpdate(
    //   commentDoc,
    //   { $push: { blog: commentDoc._id, user: commentDoc._id } },
    //   { new: true }
    // ).populate("blog").populate("user").exec();

    const populatedComment = await CommentModal.findById(commentDoc._id)
      .populate("blog")
      .populate("user")
      .exec();

    console.log("update comment");

    return res.status(201).json({
      success: true,
      message: "Comment create successfully",
      commentDoc: populatedComment,
      // commentDoc
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

const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModal.find()
      .populate("user")
      .populate("comments")
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
      .populate("comments")
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

export {
  createBlog,
  createComment,
  getAllComments,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
