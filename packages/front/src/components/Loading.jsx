import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="d-flex min-vh-100 justify-content-center align-items-center">
      <Spinner animation="border" />
    </Container>
  );
};

export default Loading;
