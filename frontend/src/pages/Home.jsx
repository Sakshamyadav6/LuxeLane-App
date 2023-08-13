import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row,InputGroup,Form } from "react-bootstrap";
import Product from "../components/Card/Product";
import Filter from "../components/Filter";
import { Container } from "@material-ui/core";
import Loading from "../components/Loading";

const Home = () => {
  const [products, setProducts] = useState({});
  const [orginalProduct, setorginalProduct] = useState({});
  const [sort, setSort] = useState([]);
  const [filters, setFilters] = useState({});
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/product"
      );
      setProducts(data.data);
      setorginalProduct(data.data);
    } catch (error) {}
  };

  const handleSort = (value) => {
    sort.includes(value)
      ? setSort(sort.filter((srt) => srt !== value))
      : setSort((prevState) => {
          return [...prevState, value];
        });
  };

  const handleFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const fetchFilteredProducts = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/product",
      {
        params: {
          ...filters,
        },
      }
    );
    setProducts(data.data);
    setorginalProduct(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  useEffect(() => {
    handleFilters("sort", sort.join(","));
  }, [sort]);

  const searchProduct = (value) => {
    const searcValue = value.toLowerCase();
    const searchedProds = orginalProduct.results.filter((result) => {
      return (
        result.name.toLowerCase().includes(searcValue) ||
        result.brand.toLowerCase().includes(searcValue)
      );
    });

    setProducts((prev) => {
      return {
        ...prev,
        results: searchedProds,
      };
    });
  };

  return (
    <Container>
      {products.status === "success" ? (
        <>
          <div className="search-btn">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Products"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e)=>searchProduct(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="clearfix">
            <span className="float-start">
              <h1>Latest Product ({products.results.length})</h1>
            </span>
            <span className="float-end">
              <Filter
                sort={sort}
                handleSort={handleSort}
                handleFilters={handleFilters}
              />
            </span>
          </div>
          <Row>
            {products.results.length === 0 ? (
              <h3 className="text-center">No Products Found</h3>
            ) : (
              products.results.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })
            )}
          </Row>
        </>
      ) : (
          <Loading/>
      )}
    </Container>
  );
};

export default Home;
