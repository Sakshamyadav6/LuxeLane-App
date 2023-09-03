import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  ModalFooter,
  Row,
} from "react-bootstrap";
import { CircularProgress } from "@mui/material";

const ProductModal = ({
  openModal,
  handleClose,
  handleChange,
  handleAdd,
  loading,
  edit,
  product,
  handleEdit,
}) => {
  return (
    <>
      <Modal show={openModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Update Form" : "Add Form"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Container>
              {edit && (
                <Row>
                  <Col md={6}>
                    <Form.Label>Product Image</Form.Label>
                    <img
                      src={product.productImage}
                      alt={product.name}
                      width={200}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    name="name"
                    label="Product Name"
                    id="name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    name="brand"
                    label="Product Brand"
                    id="brand"
                    value={product.brand}
                    onChange={handleChange}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Product Price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    name="countInStock"
                    label="Count In Stcok"
                    id="countInStock"
                    value={product.countInStock}
                    onChange={handleChange}
                  />
                </Col>
                {!edit && (
                  <Col cs={12} md={6}>
                    <TextField
                      variant="outlined"
                      type="file"
                      margin="normal"
                      required
                      fullWidth
                      name="productImage"
                      id="file"
                      onChange={handleChange}
                    />
                  </Col>
                )}

                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="category"
                    margin="normal"
                    required
                    fullWidth
                    name="category"
                    label="Category"
                    id="category"
                    value={product.category}
                    onChange={handleChange}
                  />
                </Col>
                {/* <Col cs={12} md={6}>
                  <FormControl variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" name="category">
                      <MenuItem value="Shirt">T-Shirt</MenuItem>
                      <MenuItem value="Pants">Pants</MenuItem>
                      <MenuItem value="Vest">Vest</MenuItem>
                    </Select>
                  </FormControl>
                </Col> */}
              </Row>
              <Row>
                <Col cs={12} md={12}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    multiline
                    minRows={"5"}
                    value={product.description}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            className="ms-2"
            onClick={edit ? handleEdit : handleAdd}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : edit ? (
              "Edit Product"
            ) : (
              "Add Product"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductModal;
