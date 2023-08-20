import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../components/Message";

const Order = () => {
  const { orderId } = useParams();

  const { order } = useSelector((state) => state.order);
  const { name, email } = useSelector((state) => state.auth);

  const paywithEsewa = () => {
    let path = "https://uat.esewa.com.np/epay/main";
    let params = {
      amt: 100,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: 100,
      pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
      scd: "EPAYTEST",
      su: "http://merchant.com.np/page/esewa_payment_success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      {order ? (
        <>
          <h1>Order {orderId}</h1>

          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${email}`} className="btn btn-light">
                      {email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shipping.address}
                  </p>
                  {order.isDelivered ? (
                    <Message variant={"success"}>Delivered</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>{" "}
                    {order.payment.paymentMethod.toUpperCase()}
                  </p>

                  {order.isPaid ? (
                    <Message variant={"success"}>Paid</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
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
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="mb-4">
                    {order.payment.paymentMethod === "eSewa" && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={paywithEsewa}
                      >
                        <Image
                          height={"30px"}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy42mpP9NvVIXiMNmgO6De_x17ns2veRpaToxAsoDnwg&s"
                          alt=""
                        />
                        Pay with Esewa
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Order;
