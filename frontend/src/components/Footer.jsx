import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container style={{ backgroundColor: "#323232" }} fluid >
      <Row>
        <Col className="text-center py-3">Copyright &copy; SocMed</Col>
      </Row>
    </Container>
  );
};

export default Footer;
