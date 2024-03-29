import React, { useEffect, useState } from "react";
import { getMyBlogs } from "../../services/opreations/auth";
import dummyImage from "../../assets/javascript.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/authSlice";
import Spinner from "../../components/common/Spinner";
import formatTimestamp from "../../utils/dateFormat";

const MyBlogs = () => {
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.blogs.loading);
  const [myBlog, setMyBlog] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getMyBlogs(token);
      console.log("result", result);
      if (result) {
        setMyBlog(result);
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <>
      {loading === true ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        myBlog?.map((blog) => (
          <section
            key={blog._id}
            className="w-11/12 h-screen mt-10 mb-10 mx-auto container"
          >
            <div className="flex flex-row bg-slate-800 px-3 py-3 rounded-md">
              <div className="w-4/12 cursor-pointer">
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.image ? blog.image : dummyImage}
                    className="w-11/12 h-full"
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
                  <p className="text-base text-gray-300">{blog.description}</p>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </>
  );
};

export default MyBlogs;
