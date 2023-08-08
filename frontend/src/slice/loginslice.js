import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  jwt: "",
  role: "",
};

const loginSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
});
export default loginSlice.reducer;
export const { } = loginSlice.reducer;
