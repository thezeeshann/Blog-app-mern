const BASE_URL = process.env.REACT_APP_BASE_URL

// auth endpoints
export const authEndpoints = {
    SIGNUP_API:BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}


// blog endpoints
export const blogEndpoints = {
    CREATE_BLOG:BASE_URL + "/blog/create",
    ALL_BLOGS:BASE_URL + "/blog",
    SINGLE_BLOG:BASE_URL + "/blog/:id",
    UPDATE_BLOG:BASE_URL + "/blog/:id",
    DELETE_BLOG:BASE_URL + "/blog/:id",
}