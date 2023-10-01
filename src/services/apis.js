const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  GET_USER_DETAIL_API:BASE_URL + "/auth/getAllUserDetails",
  GET_MY_BLOGS_API:BASE_URL+"/auth/myAllBlogs"
};

export const blogEndpoints = {
    GET_ALL_BLOGS_API:BASE_URL+"/blog/getAllBlog",
    CREATE_BLOG_API:BASE_URL+"/blog/createBlog",
    GET_SINGLE_BLOG_API:BASE_URL+"/blog/getSingleBlog",
    UPDATE_BLOG_API:BASE_URL+"/blog/updateBlog",
    DELETE_BLOG_API:BASE_URL+"/blog/deleteBlog",
    CREATE_COMMENT_API:BASE_URL+"/blog/createComment",
    DELETE_COMMENT_API:BASE_URL+"/blog/deleteComment"
}