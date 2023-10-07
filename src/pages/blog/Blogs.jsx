import React, { useEffect } from "react";
import dummyImage from "../../assets/javascript.webp";
import { getAllBlogs } from "../../services/opreations/blog";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatTimestamp from "../../utils/dateFormat";
import Spinner from "../../components/common/Spinner";

const Blogs = ({ searchData }) => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blogs.loading);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      {loading === true ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : Array.isArray(searchData) && searchData.length > 0 ? (
        searchData.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-row bg-slate-800 gap-x-5 px-3 py-3 rounded-md "
          >
            <div className="w-4/12 cursor-pointer">
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.image ? blog.image : dummyImage}
                  className="w-full h-full"
                  alt={blog.image}
                />
              </Link>
            </div>
            <div className="w-8/12 flex flex-col gap-y-5">
              <div>
                <p className="font-bold text-2xl">{blog.title}</p>
                <div className="flex flex-row justify-between mt-2">
                  <div className="text-gray-500 font-semibold bg-[#303540] px-2 py-1 rounded-md">
                    {blog.user?.map((user) => (
                      <p key={user._id} className="text-sm">
                        @{user?.lastName || "user"}
                      </p>
                    ))}
                  </div>
                  <div className="text-gray-500 font-semibold  bg-[#303540] px-2 py-1 rounded-md">
                    <p className="text-sm">
                      {}
                      {formatTimestamp(blog.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <p className="text-base text-gray-300">
                  {" "}
                  {blog.description
                    ? `${blog.description.slice(0, 300)}...`
                    : blog.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className=" text-3xl font-bold flex justify-center items-center h-screen">
          <p>No blog is available</p>
        </div>
      )}
    </>
  );
};

export default Blogs;
