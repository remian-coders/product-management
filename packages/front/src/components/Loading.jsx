import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading = ({ height = "min-vh-100" }) => {
  return (
    <Container
      className={`d-flex ${height} justify-content-center align-items-center`}
    >
      <Spinner animation="border" />
    </Container>
  );
};

export default Loading;
