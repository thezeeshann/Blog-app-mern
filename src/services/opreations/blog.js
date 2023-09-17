import { toast } from "react-toastify";
import { setBlogs, setLoading } from "../../redux/slices/blogSlice";
import { apiConnector } from "../apiConnetor";
import { blogEndpoints } from "../apis";

const {
  GET_ALL_BLOGS_API,
  // GET_SINGLE_BLOG_API,
  // CREATE_BLOG_API,
  // UPDATE_BLOG_API,
  DELETE_BLOG_API,
} = blogEndpoints;

export function getAllBlogs() {
  return async (dispatch) => {
    // const toastId = toast.loading("Loadng...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_BLOGS_API);
      // console.log(response.data);
      if (!response.data.success) {
        throw new Error(response.data);
      }
      dispatch(setBlogs(response.data));
    } catch (error) {
      console.log("ALL BLOGS API ERROR............", error);
    }
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
  };
}

export async function deleteBlog(blogId, navigate) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_BLOG_API, blogId);
    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Blog Deleted");
    navigate("/");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

// loggin to comment on this blog
