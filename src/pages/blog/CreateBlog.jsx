import React, { useState } from "react";
import { createBlog } from "../../services/opreations/blog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);

  const [formdata, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
  });

  const { title, category, description } = formdata;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description || !imageFile || !user) {
      toast.error("All fields are required");
    }

    await createBlog(
      {
        title: title,
        image: imageFile,
        category: category,
        description: description,
        user: user._id,
      },
      navigate,
      token
    );
  };



  return (
    <section className="w-11/12 h-min mt-10 mb-10 mx-auto space-y-5 container">
      <div className="mx-auto p-2">
        <div className="max-w-sm mx-auto my-10 bg-slate-800 px-5 py-10 rounded shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl underline">Create Blog</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="title">Blog Title</label>
              <input
                required
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                id="title"
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="category">Blog Category</label>
              <input
                type="text"
                value={category}
                onChange={handleChange}
                name="category"
                id="category"
                required
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="image">Image</label>
              <input
                required
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="text-sm  text-gray-500 border-none outline-none bg-slate-300 block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="description">Blog Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                id="description"
                cols="5"
                rows="5"
                className="border-none outline-none bg-slate-300 text-black block w-full p-2 border rounded border-gray-500"
              ></textarea>
            </div>
           
            <div className="mt-10">
              <button className="py-3 bg-[#0F172A] cursor-pointer rounded text-white font-semibold text-center w-full">
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;
