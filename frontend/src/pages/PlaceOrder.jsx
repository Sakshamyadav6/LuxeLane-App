import React from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();
  console.log(cartItems);

  return (
    <>
      <FormContainer>
        <CheckoutSteps step3 />
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
                          <Image src={item.productImage} />
                        </Col>
                        <Col>
                          <h6>{item.productName}</h6>
                        </Col>
                        <Col md={5}>
                          <span>
                            {item.qty}*${item.price}=${item.qty * item.price}
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
                  <h2>Order Summary </h2>
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
                  <Button variant="contained" fullWidth color="secondary">
                    Place Order
                  </Button>
                  <Button
                    className="mt-1"
                    onClick={() => navigate("/payment")}
                    fullWidth
                  >
                    Go back
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default PlaceOrder;
