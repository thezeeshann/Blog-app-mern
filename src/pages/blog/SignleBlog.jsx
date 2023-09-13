import React, { useEffect, useState } from "react";
import SingleBlogCard from "./SingleBlogCard";
import { useParams } from "react-router-dom";
import { blogEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnetor";
const { GET_SINGLE_BLOG_API } = blogEndpoints;

const SignleBlog = () => {
  const { blogId } = useParams();
  const [singleBlog, setSingleBlog] = useState({});

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await apiConnector(
          "GET",
          `${GET_SINGLE_BLOG_API}/${blogId}`
        );
        setSingleBlog(response.data.blogDetails);
      } catch (error) {
        console.log("SINGLE BLOGS API ERROR............", error);
      }
    };
    fetchSingleBlog();
  }, [blogId]);

  return (
    <section className="w-11/12 h-min mt-16 mb-10 mx-auto space-y-5 container">
      <SingleBlogCard singleBlog={singleBlog} />
    </section>
  );
};

export default SignleBlog;
