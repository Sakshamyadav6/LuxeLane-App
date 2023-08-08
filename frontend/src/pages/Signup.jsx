import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const SignupHandle = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.warning("Confirm Password doesn't match Password");
      return;
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/auth/register",
          {
            name,
            email,
            password,
          }
        );
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message);
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "40px" }}
        >
          <Col xs={12} md={6}>
            <h1 style={{ textAlign: "center" }}>Sign Up</h1>
            <Form onSubmit={SignupHandle}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alex"
                  required
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@gmail.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*************"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*************"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button
                variant="warning"
                type="submit"
                disabled={loading}
                style={{ width: "550px" }}
              >
                {loading ? <CircularProgress color="inherit" /> : <>Sign up</>}
              </Button>
              <br />
              <Form.Text>Already User?</Form.Text>
              <Link to={"/"}>Login</Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Signup;
