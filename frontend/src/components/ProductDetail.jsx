import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "./Card/Rating";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import { addToCart } from "../slice/cartSlice";

const ProductDetals = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/product/${id}`
    );
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = (quantity) => {
    const data = payloadForCartItem(product.data, quantity);
    dispatch(addToCart(data));

    navigate("/cart");
  };

  const payloadForCartItem = (data, qty) => {
    return {
      productId: data._id,
      productName: data.name,
      productImage: data.productImage,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };
  };

  return (
    <>
      {product.status === "success" ? (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product.data.productImage}
                alt={product.data.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>{product.data.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.data.averageRating}
                    text={`${
                      product.data.Reviews ? product.data.Reviews.length : 0
                    } reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.data.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.data.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.data.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product.data.countInStock > 0
                          ? "In Stock"
                          : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.data.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <FormControl>
                          <Select
                            defaultValue=""
                            onChange={(e) => setQty(e.target.value)}
                            label="Qty"
                            value={qty}
                          >
                            {[...Array(product.data.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(qty)}
                    disabled={product.data.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductDetals;
