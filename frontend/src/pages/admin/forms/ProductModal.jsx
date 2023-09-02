import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";

const ProductModal = ({ openModal, handleClose }) => {
  return (
    <>
      <Modal show={openModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Container>
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
                    //   onChange={}
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
                    //   onChange={}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Product Price"
                    id="price"
                    //   onChange={}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    name="countInStock"
                    label="Count In Stcok"
                    id="countInStock"
                    //   onChange={}
                  />
                </Col>
                <Col cs={12} md={6}>
                  <TextField
                    variant="outlined"
                    type="file"
                    margin="normal"
                    required
                    fullWidth
                    name="productImage"
                    id="file"
                    // onChange={}
                  />
                </Col>
              </Row>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductModal;
