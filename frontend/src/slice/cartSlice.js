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
    removeFromCart: (state, data) => {
      state.cartItems = state.cartItems.filter((cartItem) => {
        return cartItem.productId !== data.payload;
      });
    },
    addShippingAddress: (state, data) => {
      console.log(data);
      state.shippingAddress = data.payload;
    },
    addpaymentMethod: (state, data) => {
      state.paymentMethod = data.payload;
    },
    resetOrder: (state) => {
      state.order = {};
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  addShippingAddress,
  addpaymentMethod,
  resetCart,
  removeFromCart,
} = cartSlice.actions;
