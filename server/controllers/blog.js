import BlogModal from "../models/Blog.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";
import * as dotenv from "dotenv"
dotenv.config()

const CreateBlog = async (req, res) => {
  try {
    const image = req.files.image;
    const { title, category, description, comments } = req.body;

    if (!title || !category || !description || !comments) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    // upload file in local server
    // const path =
    //   __dirname + "/files/" + Date.now() + `.${image.name.split(".")[1]}`;
    // console.log(path);
    // image.mv(path, (err) => {
    //   if (err) {
    //     return res.status(500).json({ message: 'File upload failed', error: err });
    //   }
    // });


    const uploadImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(uploadImage)

    const blog = await BlogModal.create({
      title,
      image: uploadImage.secure_url,
      category,
      description,
      comments,
    });
    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog,
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
    const blogs = await BlogModal.find();
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
    console.log(blogId);
    const blog = await BlogModal.findById(blogId);
    console.log(blog);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog not found`,
      });
    }
    return res.status(200).json({
      success: true,
      blog,
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
    const blogId = req.params.id;
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
    const blogId = req.params.id;
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

export { CreateBlog, getAllBlog, getSingleBlog, updateBlog, deleteBlog };
