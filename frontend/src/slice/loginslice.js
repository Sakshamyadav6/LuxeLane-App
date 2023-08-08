import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  jwt: "",
  role: "",
  email: "",
  name:"",
};

const loginSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      state.isLoggedIn = true;
      state.jwt = data.payload.jwt;
      state.role = data.payload.role;
      state.name = data.payload.name; 
      state.email = data.payload.email;
    }
  },
});
export default loginSlice.reducer;
export const {login} = loginSlice.actions;
