import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading:false
};

const blogSlices = createSlice({
  name: "blog",
  initialState,
<<<<<<< HEAD
=======

>>>>>>> 6e8688a26a63a1d6e96b18b12c7ecd0e0843a5b6
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlogs,setLoading,setError } = blogSlices.actions;

export default blogSlices.reducer;
