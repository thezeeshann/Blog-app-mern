import { setToken, setLoading } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { apiConnector } from "../apiConnetor";
import { authEndpoints } from "../apis";
import { setUser } from "../../redux/slices/userSlice";

const { SIGNUP_API, LOGIN_API, GET_USER_DETAIL_API, GET_MY_BLOGS_API } =
  authEndpoints;

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      console.log("SIGNUP API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response.data.message);
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.existsUser))
      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log(response.data.existsUser)
      navigate("/profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getAllUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAIL_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data.data));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getMyBlogs(token) {
  let result = [];
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector("GET", GET_MY_BLOGS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_USER_BLOG API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
    console.log(response.data.data);
  } catch (error) {
    console.log("GET_MY_BLOGS API ERROR............", error);
    toast.error("Could Not Get User Blog Details");
  }
  toast.dismiss(toastId);
  return result;
}
