import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  getSingleBlog :{
    comments: [], 
  },
  loading:false
};

const blogSlices = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    getSingleBlog:(state,action)=>{
      state.getSingleBlog = action.payload
    },
    addCommentToSingleBlog: (state, action) => {
      state.getSingleBlog.comments.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlogs,getSingleBlog,addCommentToSingleBlog, setLoading } = blogSlices.actions;

export default blogSlices.reducer;
