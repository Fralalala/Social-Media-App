import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/postAction";

const Header = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [userInfo]);

  const {} = userReducer;

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="mb-4"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SocMed</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoggedIn === true ? (
                <Fragment>
                  
                  <LinkContainer to="/search">
                    <Nav.Link>
                      <i className="fas fa-search"></i> Search
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="fas fa-user-circle"></i> Profile
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/friends">
                    <Nav.Link>
                      <i className="fas fa-users"></i> Friends
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <Nav.Link>
                      <i className="fas fa-user-cog"></i> Settings
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/login"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <Nav.Link>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
