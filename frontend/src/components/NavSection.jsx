import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavDropdown,
  Nav,
  Container,
  Navbar,
  Button,
  NavLink,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slice/loginSlice";
import { resetCart } from "../slice/cartSlice";

const NavSection = () => {
  const user = useSelector((state) => state.auth);
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // dispatch(logout());
    // dispatch(resetCart())
    navigate("/");
  };
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
                  {user.role === "admin" ? (
                    <>
                      <NavDropdown title={user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item>Profile</NavDropdown.Item>

                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link>
                        <Link to={"/admin/dasboard"}>Admin</Link>
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link>
                        <Link to="/cart">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                      </Nav.Link>

                      <NavDropdown title={user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item>Profile</NavDropdown.Item>

                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
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
