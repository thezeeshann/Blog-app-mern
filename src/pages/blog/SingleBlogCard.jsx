import React from "react";
import dummyImage from "../../assets/javascript.webp";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import formatTimestamp from "../../utils/dateFormat";
import { deleteBlog } from "../../services/opreations/blog";
import { useNavigate } from "react-router-dom";

const SingleBlogCard = ({ singleBlog }) => {
  const navigate = useNavigate();
  const handleBlogDelete = async (blogId) => {
    await deleteBlog({ blogId: blogId }, navigate);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-bold text-2xl normal-case">{singleBlog.title}</h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          <FaEdit className="hover:text-sky-500 cursor-pointer text-xl" />
          <FaTrash
            className="hover:text-sky-500 cursor-pointer"
            onClick={() => handleBlogDelete(singleBlog._id)}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {singleBlog.user?.map((user) => (
          <span
            key={user._id}
            className="bg-bgColorTwo rounded-lg py-1.5 capitalize  px-3"
          >
            @{user.firstName} {user.lastName}
          </span>
        ))}
        <span className="bg-bgColorTwo rounded-lg py-1.5 px-3">
          {formatTimestamp(singleBlog.createdAt)}
        </span>
      </div>
      <div>
        <img
          src={singleBlog.image ? singleBlog.image : dummyImage}
          className="w-full rounded-lg h-full"
          alt=""
        />
      </div>
      <div className=" py-5">
        <p>{singleBlog.description}</p>
        <div className="pt-3">
          <span className="font-bold text-xl">Categories: </span>{" "}
          <span className="bg-bgColorTwo rounded-lg py-1.5 px-3">
            {singleBlog.category}
          </span>{" "}
        </div>
      </div>
      <div className="mt-3 ">
        <p className="font-bold text-xl">Comments: </p>
        <div className="flex gap-y-3 flex-col">
          {singleBlog.comments?.map((comment) => (
            <div
              key={comment._id}
              className="mt-1 w-2/4 bg-bgColorTwo py-2 rounded-md"
            >
              <div className="flex justify-between px-3">
                <p className="capitalize font-semibold text-gray-400">
                  @{comment.user.lastName}
                </p>

                <span className="text-gray-400 font-semibold">
                  {formatTimestamp(comment.createdAt)}
                </span>
              </div>

              <p className="mt-3 px-3  text-slate-500 capitalize">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 w-2/4 flex justify-between">
          <input
            type="text"
            className="border-none outline-none bg-bgColorTwo rounded-md py-2 px-2 placeholder:text-sm"
            placeholder="Write a comments..."
          />
          <button
            type="submit"
            className="bg-bgColorTwo px-3 rounded-md font-semibold text-sm"
          >
            Add Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
