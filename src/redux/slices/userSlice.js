import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("token")
    ? JSON.stringify(localStorage.getItem("token"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
