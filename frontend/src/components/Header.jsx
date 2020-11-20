import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/postAction";

const Header = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer)
  const postReducer = useSelector(state => state.postReducer)



  const {} = userReducer;

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="mb-5"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SocMed</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/profile">
                <Nav.Link>
                  <i className="fas fa-user-circle"></i> Profile
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login" onClick={() => {
                dispatch(logout())
              }}>
                <Nav.Link>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
