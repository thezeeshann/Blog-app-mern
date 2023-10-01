import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  getSingleBlog :[],
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlogs,getSingleBlog, setLoading } = blogSlices.actions;

export default blogSlices.reducer;
