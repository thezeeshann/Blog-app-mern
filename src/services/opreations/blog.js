import { toast } from "react-toastify";
import { setBlogs, setLoading } from "../../redux/slices/blogSlice";
import { apiConnector } from "../apiConnetor";
import { blogEndpoints } from "../apis";

const {
  GET_ALL_BLOGS_API,
  CREATE_BLOG_API,
  UPDATE_BLOG_API,
  DELETE_BLOG_API,
  CREATE_COMMENT_API,
  DELETE_COMMENT_API,
} = blogEndpoints;

export async function createBlog(data, navigate, token) {
  // return async (dispatch)=>{
  const toastId = toast.loading("Loading....");
  // dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", CREATE_BLOG_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE BLOG API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Blog Created Successful");
    navigate("/");
  } catch (error) {
    console.log("CREATE BLOG API ERROR............", error);
    toast.error(error);
  }
  toast.dismiss(toastId);
  // dispatch(setLoading(false));
  // }
}

export function getAllBlogs() {
  return async (dispatch) => {
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
  };
}

export async function editBlog(data, token, navigate) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_BLOG_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE BLOG API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Blog Updated Successful");
    result = response?.data?.data;
    navigate("/profile");
  } catch (error) {
    console.log("UPDATE BLOG API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

export async function deleteBlog(blogId, token, navigate) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_BLOG_API, blogId, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE BLOG API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Blog Deleted");
    navigate("/");
  } catch (error) {
    console.log("DELETE BLOG API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

// comment
export async function createComment(data, token) {
  // return async (dispatch) => {
  //   dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_COMMENT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COMMENT REPOSE", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Comment posted");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COMMENT API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
  //   dispatch(setLoading(false));
  // };
}

export async function deleteComment(commentId, token) {
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COMMENT_API,
      commentId,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE COMMENT API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Comment Deleted");
  } catch (error) {
    console.log("DELETE COMMENT API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}
