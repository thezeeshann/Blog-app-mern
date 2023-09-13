import React from 'react'
import dummyImage from "../../assets/javascript.webp";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const SingleBlogCard = ({singleBlog}) => {

  const timestamp = singleBlog.createdAt;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

const formattedDate = `${year} ${month} ${day}`;


  return (
    <div className="flex flex-col gap-y-5">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="font-bold text-2xl normal-case">
                {singleBlog.title}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-3">
              <FaTrash className="hover:text-sky-500 cursor-pointer" />
              <FaEdit className="hover:text-sky-500 cursor-pointer text-xl" />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <span className="bg-bgColorTwo rounded-lg py-1.5 px-3">@james</span>
            <span className='bg-bgColorTwo rounded-lg py-1.5 px-3'>{formattedDate}</span>
          </div>
          <div>
            <img src={singleBlog.image ? singleBlog.image : dummyImage} className="w-full rounded-lg h-full" alt="" />
          </div>
          <div className=" py-5">
            <p>
              {singleBlog.description}
            </p>
            <div className="pt-3">
              <span className="font-bold text-xl">Categories:</span>{" "}
              <span className="bg-bgColorTwo rounded-lg py-1.5 px-3">
                {singleBlog.category}
              </span>{" "}
            </div>
          </div>
          <div className="mt-3 ">
            <p className="font-bold text-xl">Comments:</p>
            <div className="flex gap-y-3 flex-col">
              <div className="mt-1 w-2/4 bg-bgColorTwo py-1 rounded-md">
                <div className="flex justify-between px-3">
                  <p>@james</p>
                  <span>sun Aug 23 06 01</span>
                </div>
                <p className="mt-3 px-3">this is cool</p>
              </div>
              <div className="pt-2 w-2/4 bg-bgColorTwo py-1 rounded-md">
                <div className="flex justify-between px-3">
                  <p>@james</p>
                  <span>sun Aug 23 06 01</span>
                </div>
                <p className="mt-3 px-3">this is cool</p>
              </div>
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
  )
}

export default SingleBlogCard