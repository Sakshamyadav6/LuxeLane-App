import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Card/Product";

const Home = () => {
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/product"
      );
      setProduct(response.data.data);
      console.log(response.data.data);
      console.log(product);
    } catch (error) {
      toast.error("Can't Display Product");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {product.status === "success" ? (
        <>
          <Row>
            {product.results.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <h4>werfdgf</h4>
      )}
      <ToastContainer />
    </>
  );
};

export default Home;
