import { toast } from "react-toastify";
import { setBlogs, setLoading } from "../../redux/slices/blogSlice";
import { apiConnector } from "../apiConnetor";
import { blogEndpoints } from "../apis";

const {
  GET_ALL_BLOGS_API,
  GET_SINGLE_BLOG_API,
  CREATE_BLOG_API,
  UPDATE_BLOG_API,
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
