import React from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  return (
    <>
      <FormContainer>
        <CheckoutSteps step3 />
      </FormContainer>
    </>
  );
};

export default PlaceOrder;
