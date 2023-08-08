import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const LoginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        {
          email,
          password,
        },
        setLoading(true)
      );
      console.log(response.data);
      if (response.data.status) {
        navigate("/home");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log("Login Failed", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "150px" }}
        >
          <Col xs={12} md={6}>
            <Form onSubmit={LoginHandle}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@gmail.com"
                  required
                  autoFocus
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
                {loading ? <CircularProgress color="inherit" /> : <>Sign in</>}
              </Button>
              <br />
              <Form.Text>New User?</Form.Text>
              <Link to={"/signup"}>Register</Link>
              <Form.Text style={{ float: "right" }}>Forgot Password</Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
