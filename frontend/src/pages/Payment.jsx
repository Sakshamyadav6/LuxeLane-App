import { React, useState } from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addpaymentMethod } from "../slice/cartSlice";

const Payment = () => {
  const payment = useSelector((state) => state.cart.paymentMethod);
   const [paymentMethod, setPaymentMethod] = useState(payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addpaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step2 />
      <h2>Payment Method</h2>
      <Form onSubmit={SubmitHandler}>
        <Row>
          <Col md={12}>
            <Form.Check
              type="radio"
              label="eSewa"
              value="eSewa"
              checked={paymentMethod === "eSewa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col md={12}>
            <Form.Check
              type="radio"
              label="PayPal"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Button type="submit" className="btn btn-warning mt-3" fullwidth>
            Next
          </Button>
          <Button
            className="btn btn-info mt-3"
            fullwidth
            onClick={() => navigate("/shipping")}
          >
            Back
          </Button>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Payment;
