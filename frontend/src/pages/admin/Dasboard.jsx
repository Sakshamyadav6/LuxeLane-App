import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../../../services/axios.service";
import Loading from "../../components/Loading";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductModal from "./forms/ProductModal";

const Dasboard = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const { jwt } = useSelector((state) => state.auth);

  const [products, setProducts] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const getProduct = async () => {
    const response = await getData("product");
    setProducts(response.data);
    console.log(response.data);
  };
  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteData(`product/${id}`, jwt);
    const filteredProds = products.results.filter((product) => {
      return product._id !== id;
    });
    setProducts((prev) => {
      return { ...prev, count: filteredProds.length, results: filteredProds };
    });
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    setOpenModal(true);
  };
  useEffect(() => {
    getProduct();
  }, []);
  function returnDate(product) {
    return (
      new Date(product.createdAt).getFullYear() +
      "-" +
      new Date(product.createdAt).getMonth() +
      "-" +
      new Date(product.createdAt).getDate()
    );
  }

  return (
    <>
      {products.status === "success" ? (
        <>
          <Row>
            <Col>
              <h1 className="text-center">Products ({products.count})</h1>
            </Col>
            <Col className="text-right">
              <Button
                className="btn btn-warning"
                onClick={(e) => addProductHandler(e)}
              >
                <i className="fas fa-plus me-2"></i>
                Add Product
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.count > 0 ? (
                products.results.map((product) => {
                  return (
                    <tr key={product._id} className="text-center">
                      <td>
                        <img
                          className="rounded"
                          src={product.productImage}
                          alt={product.name}
                          height={0} //height bug
                          width={80}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{returnDate(product)}</td>
                      <td>
                        <Button className="btn btn-secondary me-3 mb-2">
                          <i class="fa-solid fa-pen-to-square"></i> Edit
                        </Button>
                        <Button
                          className="btn btn-danger  ms-1 mb-2"
                          onClick={(e) => deleteHandler(e, product._id)}
                        >
                          <i class="fa-solid fa-trash"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <ProductModal openModal={openModal} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dasboard;
