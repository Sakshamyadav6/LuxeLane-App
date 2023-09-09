import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../slice/loginSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginHandle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/auth/login",
        { email, password }
      );
      if (response.data.status) {
        const logindata = {
          name: response.data.authData.name,
          email: response.data.authData.email,
          jwt: response.data.token,
          role: response.data.authData.role,
        };
        dispatch(login(logindata));
        navigate("/home");
        toast.success("Sucessfully Login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    setEmail("saksham1@gmail.com");
    setPassword("12345678");
  };
  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "90px" }}
        >
          <Col xs={12} md={6}>
            <h1 style={{ textAlign: "center" }}>Sign In</h1>
            <Form onSubmit={LoginHandle}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="abc@gmail.com"
                  required
                  autoFocus
                  value={email}
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
                  value={password}
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
                style={{ width: "45vw" }}
              >
                {loading ? <CircularProgress color="inherit" /> : <>Sign in</>}
              </Button>
              <br />
              <Form.Text>New User?</Form.Text>
              <Link to={"/signup"}>Register</Link>
              <Form.Text style={{ float: "right" }}>Forgot Password</Form.Text>
            </Form>
            <Button
              className="btn btn-info"
              style={{ float: "right", marginRight: "9vw" }}
              onClick={handleData}
            >
              For E-mail and Password
            </Button>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
