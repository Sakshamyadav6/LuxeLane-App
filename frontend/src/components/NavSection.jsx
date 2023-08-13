import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavDropdown, Nav, Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavSection = () => {
  const user = useSelector((state) => state.auth);
  const [search, setSearch] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={"/home"}>LuxeLane</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to={"/home"}>Home</Link>
              </Nav.Link>

              {user.isLoggedIn ? (
                <>
                  <Nav.Link>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Nav.Link>

                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item>Profile</NavDropdown.Item>

                    <NavDropdown.Item>
                      Logout{" "}
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Button variant="warning">
                  <Link to={"/"}>Log in</Link>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavSection;
