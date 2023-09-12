import { toast } from "react-toastify";
import { setBlogs, setLoading } from "../blogSlice";
import axios from "axios";

export const getAllBlogs = () => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    try {
      dispatch(setLoading(true));
      const response = await axios.get("http://localhost:8000/api/v1/blog");
      console.log(response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setBlogs(response.data));
    } catch (error) {
      console.error("All blogs API error:", error.message);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
};
