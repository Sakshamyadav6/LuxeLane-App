import React from "react";
import { useSelector } from "react-redux";
import { NavDropdown, Nav, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavSection = () => {
  const user = useSelector((state) => state.auth);
  return (
    <>
      <Navbar expand="lg" bg="warning" data-bs-theme="light" style={{height:'80px'}}>
        <Container>
          <Navbar.Brand>
            <Link to={'/home'}>
              <img
                src="/img/logo.png"
                width="150"
                height="80"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavSection;
