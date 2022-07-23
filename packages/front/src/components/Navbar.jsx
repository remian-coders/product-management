import React from "react";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarM = () => {
  return (
    <Navbar bg="light" expand={false} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="./">Email</NavLink>
              <NavLink to="./user">Create user</NavLink>
              <NavLink to="./ip-address">IP Address</NavLink>
              <NavLink to="./csv">CSV File</NavLink>
              <NavLink to="./password-update">Update Password</NavLink>
              <NavLink to="./incasare">Admin Incasare</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarM;
