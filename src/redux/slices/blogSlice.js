import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading:false
};

const blogSlices = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlogs,setLoading } = blogSlices.actions;

export default blogSlices.reducer;
