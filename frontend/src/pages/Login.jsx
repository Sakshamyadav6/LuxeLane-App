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
  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "90px" }}
        >
          <Col xs={12} md={6}>
            <h1 style={{textAlign:'center'}}>Sign In</h1>
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
      <ToastContainer />
    </>
  );
};

export default Login;
// MONGO_URI =mongodb+srv://admin:admin@cluster0.msxjsdv.mongodb.net/?retryWrites=true&w=majority
