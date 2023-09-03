import {
  Card,
  FormControl,
  MenuItem,
  Select,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../slice/cartSlice";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  selectEmpty: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));
const Cart = () => {
  const [qty, setQty] = useState(1);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.productImage}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>
                      <h4>{item.productName}</h4>
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        defaultValue=""
                        onChange={(e) => setQty(e.target.value)}
                        label="Qty"
                        value={item.qty}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                  <Col>${item.price * item.qty}</Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeFromCart(item.productId))}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="text-center">
            Your cart is empty. <Link to={"/home"}>Continue Shopping</Link>
          </div>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Total Price: $
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/shipping")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
