import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    createOrder: (state, data) => {
      state.order = data.payload;
    },
  },
});

export default orderSlice.reducer;

export const { createOrder } = orderSlice.actions;
