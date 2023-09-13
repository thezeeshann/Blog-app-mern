import React, { useEffect } from "react";
import dummyImage from "../../assets/javascript.webp";
import { getAllBlogs } from "../../services/opreations/blog";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"

const Blogs = () => {
  
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs);
  const blogsData = blog.blogs.blogs;


  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      {Array.isArray(blogsData) && blogsData.length > 0 ? (
        blogsData.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-row bg-slate-800 px-3 py-3 rounded-md"
          >
            <div className="w-4/12 cursor-pointer">
              <Link to={`/blog/${blog._id}`}>
                <img src={blog.image ? blog.image : dummyImage } className="w-11/12 h-full" alt={blog.image} />
              </Link>
            </div>
            <div className="w-8/12 flex flex-col gap-y-5">
              <div>
                <p className="font-bold text-2xl">
                  {blog.title}
                </p>
                <div className="flex flex-row justify-between mt-2">
                  <div className="text-gray-500 font-semibold bg-[#303540] px-2 py-1 rounded-md">
                    <p className="text-sm">@james</p>
                  </div>
                  <div className="text-gray-500 font-semibold  bg-[#303540] px-2 py-1 rounded-md">
                   
                    <p className="text-sm">
                    {blog.createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <p className="text-base text-gray-300">{blog.description}</p>
              </div>
            </div>
          </div>
        ))
      ) : null}
    </>
  );
};

export default Blogs;
