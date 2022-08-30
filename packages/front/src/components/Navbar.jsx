import React from "react";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarM = ({ today, daily, setToken, setRole }) => {
  const todayFrom = new Date(today?.from).toTimeString().split(" ")[0];
  const todayTo = new Date(today?.to).toTimeString().split(" ")[0];
  const dailyFrom = new Date(daily?.from).toTimeString().split(" ")[0];
  const dailyTo = new Date(daily?.to).toTimeString().split(" ")[0];

  const logoutHandler = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
  };

  return (
    <Navbar bg="light" expand={false} className="mb-3">
      <Container fluid>
        <Link to="./" className="text-decoration-none">
          <Navbar.Brand>
            Admin - {new Date().toLocaleDateString()} - Working Hours
          </Navbar.Brand>
        </Link>
        <Navbar.Text>
          Daily: {dailyFrom} - {dailyTo}
          {" | "}
          {today
            ? `Today: ${todayFrom} - ${todayTo}`
            : `Today: ${dailyFrom} - ${dailyTo}`}
        </Navbar.Text>

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
              <NavLink to="./">Admin Incasare</NavLink>
              <NavLink to="./emails">Email</NavLink>
              <NavLink to="./user">Create User</NavLink>
              {/* <NavLink to="./ip-address">IP Address</NavLink> */}
              <NavLink to="./csv">CSV File</NavLink>
              <NavLink to="./password-update">Update Password</NavLink>
              <NavLink to="./issues">Issues Table</NavLink>
              <NavLink to="./" onClick={logoutHandler}>
                Log out
              </NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarM;
