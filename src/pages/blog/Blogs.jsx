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
            className="lg:flex lg:flex-row md:flex md:flex-row sm:flex sm:flex-col xs:flex xs:flex-col rounded-md bg-slate-800 lg:gap-x-5 lg:px-3 lg:py-3 md:gap-x-3 md:px-2 md:py-2 sm:gap-x-3 sm:gap-y-3 sm:px-3 sm:py-3  xs:gap-y-3 xs:px-3 xs:py-3  small-xs:gap-y-5 small-xs:px-3 small-xs:py-3 "
          >
            <div className="lg:w-4/12 md:w-2/5 sm:w-full xs:w-full small-xs:w-full cursor-pointer">
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.image ? blog.image : dummyImage}
                  className="lg:w-full lg:h-full md:w-full md:h-full sm:w-full sm:h-full xs:w-full xs:h-full small-xs:w-full small-xs:h-full"
                  alt={blog.image}
                />
              </Link>
            </div>
            <div className="lg:w-8/12 md:w-3/5 sm:w-full xs:w-full flex flex-col gap-y-5">
              <div>
                <p className="font-bold lg:text-2xl md:text-xl">{blog.title}</p>
                <div className="flex flex-row justify-between mt-2">
                  <div className="text-gray-500 font-semibold bg-[#303540] px-2 py-1 rounded-md">
                    {blog.user?.map((user) => (
                      <p key={user._id} className="lg:text-sm md:text-xs">
                        @{user?.lastName || "user"}
                      </p>
                    ))}
                  </div>
                  <div className="text-gray-500 font-semibold  bg-[#303540] px-2 py-1 rounded-md">
                    <p className="lg:text-sm md:text-xs">
                      {}
                      {formatTimestamp(blog.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <p className="lg:text-base md:text-sm text-gray-300">
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
