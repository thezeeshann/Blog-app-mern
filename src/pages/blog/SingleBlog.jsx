import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBlog } from "../../redux/slices/blogSlice";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import dummyImage from "../../assets/javascript.webp";
import formatTimestamp from "../../utils/dateFormat";
import {
  createComment,
  deleteComment,
  deleteBlog,
} from "../../services/opreations/blog";
import { blogEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnetor";
const { GET_SINGLE_BLOG_API } = blogEndpoints;

const SingleBlog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const singleBlog = useSelector((state) => state.blogs.getSingleBlog);
  const [comment, setComment] = useState();

  // blog Delete
  const handleBlogDelete = async (blogId) => {
    if (token === null) {
      return toast.error("Login To Delete This Blog");
    }
    const userIsAuthorized = singleBlog.user.some(
      (blogUser) => blogUser?._id === user._id
    );

    if (!userIsAuthorized) {
      return toast.error("You are not authorized to delete this blog.");
    }

    try {
      await deleteBlog({ blogId: blogId }, token, navigate);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // comment Delete
  const handleCommentDelete = async (commentId) => {
    if (token === null) {
      return toast.error("Login To Delete This Comment");
    }

    const userIsAuthorized = singleBlog.comments?.some((comment) => {
      if (comment.user?._id) {
        return comment.user?._id === user._id;
      }
      return false;
    });

    if (!userIsAuthorized) {
      return toast.error("You are not authorized to delete this blog.");
    }

    await deleteComment(
      {
        commentId: commentId,
      },
      token
    );

    setComment(
      singleBlog.comments?.filter((comment) => comment._id !== commentId)
    );
  };

  // update Blog
  const userIsAuthorizedToUpdateBlog = singleBlog.user?.some((blogUser) => {
    if (blogUser?._id === user?._id) {
      return blogUser?._id === user?._id;
    }
    return false;
  });
  const handleUpdateBlog = async () => {
    if (token === null) {
      return toast.error("Login To Update This Blog");
    }

    if (!userIsAuthorizedToUpdateBlog) {
      return toast.error("You are not authorized to update this blog.");
    }
  };

  // create comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token === null) {
      return toast.error("Login To Comment This Blog");
    } else {
      if (!comment || !blogId || !user?._id) {
        return toast.error("Enter the comment");
      } else {
        const data = {
          comment: comment,
          blogId: blogId,
          user: user._id,
        };

        await createComment(data, dispatch, token);
        setComment("");
      }
    }
  };

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await apiConnector(
          "GET",
          `${GET_SINGLE_BLOG_API}/${blogId}`
        );
        console.log("SINGLE BLOGS API RESPONSE", response);
        dispatch(getSingleBlog(response?.data?.blogDetails));
      } catch (error) {
        console.log("SINGLE BLOGS API ERROR............", error);
      }
    };
    fetchSingleBlog();
  }, [blogId, dispatch, comment]);

  return (
    <section className="w-11/12 h-min mt-16 mb-10 mx-auto space-y-5 container">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-2xl normal-case">
              {singleBlog.title}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-3">
            {token !== null ? (
              <Link
                to={`${
                  userIsAuthorizedToUpdateBlog === true
                    ? `/profile/update-blog/${blogId}`
                    : ""
                }`}
              >
                <FaEdit
                  onClick={() => handleUpdateBlog()}
                  className="hover:text-sky-500 cursor-pointer text-xl"
                />
              </Link>
            ) : (
              <FaEdit
                onClick={() => handleUpdateBlog()}
                className="hover:text-sky-500 cursor-pointer text-xl"
              />
            )}
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
          <p className="text-lg">{singleBlog.description}</p>
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
                    @{comment.user?.lastName || "user"}
                  </p>

                  <span className="text-gray-400 font-semibold">
                    {formatTimestamp(comment.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between px-3 items-center">
                  <p className="mt-3 px-3  text-slate-500 capitalize">
                    {comment?.comment}
                  </p>
                  <div className="text-gray-400 hover:text-sky-500 cursor-pointer">
                    <FaTrash onClick={() => handleCommentDelete(comment._id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5 w-2/4 flex gap-x-5 justify-between">
              <input
                value={comment || ""}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="border-none outline-none bg-bgColorTwo rounded-md py-2 px-2 placeholder:text-sm w-2/3"
                placeholder="Write a comments..."
              />
              <button
                type="submit"
                className="bg-bgColorTwo px-3 rounded-md font-semibold text-sm w-1/3"
              >
                Add Comments
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
