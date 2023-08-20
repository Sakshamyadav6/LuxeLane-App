import React from "react";
import CheckoutStep from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder } from "../slice/orderSlice";
import { ToastContainer, toast } from "react-toastify";

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  console.log(shippingAddress);
  const { jwt } = useSelector((state) => state.auth);
  console.log(jwt);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    const itemsPrice = cartItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    const shippingPrice = 0;
    const taxPrice = 0.13 * itemsPrice;
    const orderData = {
      orderItems: cartItems,
      shipping: shippingAddress,
      payment: { paymentMethod },
      itemsPrice,
      shippingPrice: 0,
      taxPrice,
      totalPrice: itemsPrice + shippingPrice + taxPrice,
    };
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(Response);
      dispatch(createOrder(data.data));
      navigate(`/order/${data.data._id}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <FormContainer>
      <CheckoutStep step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {shippingAddress.postalcode}, {shippingAddress.city},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>Method: {paymentMethod.toUpperCase()}</p>
            </ListGroup.Item>
            <ListGroup variant="flush">
              {cartItems.map((item, index) => {
                return (
                  <ListGroup.Item key={item.productId}>
                    <Row>
                      <Col md={3}>
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <span>{item.productName}</span>
                      </Col>
                      <Col md={4}>
                        <span>
                          {item.qty} * ${item.price} = ${item.qty * item.price}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    $
                    {0.13 *
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    {0.13 *
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      ) +
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Place Order
                </Button>
                <Button
                  className="mt-1"
                  onClick={() => navigate("/payment")}
                  variant="contained"
                  fullWidth
                >
                  Go back
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </FormContainer>
  );
};

export default PlaceOrder;
