import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, FormGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [profilePicSrc, setProfilePicSrc] = useState();

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const [images, setImages] = useState()

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      dispatch(register(name, email, password, uniqueName, images));
    }
  };

  return (
    <Container className="mt-4 "  >
      <Row>
        <Col md={6}>
          <h1>Create an Account</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Unique Link Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Unique Name"
                value={uniqueName}
                onChange={(e) => {
                  setUniqueName(e.target.value);
                }}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              ></Form.Control>
            </FormGroup>


            <FormGroup>
            <Form.Label>Profile Pic File</Form.Label>
                <Form.File
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setImages(e.target.files)
                  }}
                  required
                >

                </Form.File>
            </FormGroup>


            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>

            <Button type="submit" variant="primary">
              Login
            </Button>

            <Spinner animation="grow" />

          </Form>
        </Col>

        <Col md={5}>
          <Row
            className="mt-4 justify-content-md-center"
            style={{ height: "100%" }}
          >
            <h2
              onClick={() => {
                console.log(userInfo);
              }}
            >
              Find some peepz
            </h2>
            <h3>Lorem, ipsum dolor.</h3>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="mt-4">
          Have an Account?
          <Link to="/login"> Sign in Here </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
