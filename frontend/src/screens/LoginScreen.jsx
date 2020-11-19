import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoggedInUser, login } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);

  const { userInfo } = userReducer;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    } else {
      const id = JSON.parse(localStorage.getItem("token"));

      if (id) {
        getLoggedInUser(id);
      }
    }
  }, [userInfo]);

  return (
    <Container className="mt-4 ">
      <Row>
        <Col md={6}>
          <h1>Sign in</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Passowrd</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>

            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>

        <Col md={5}>
          <Row
            className="mt-4 justify-content-md-center"
            style={{ height: "100%" }}
          >
            <h2>Find your friends</h2>
            <h3>Lorem, ipsum dolor.</h3>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="mt-4">
          New here?
          <Link to="/register"> Sign up Here</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
