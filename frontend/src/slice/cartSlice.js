import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, data) => {
      const item = data.payload;

      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === item.productId ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    addShippingAddress: (state, data) => {
      console.log(data)
      state.shippingAddress = data.payload;

       
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, addShippingAddress } = cartSlice.actions;
