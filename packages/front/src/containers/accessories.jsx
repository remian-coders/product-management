import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Categories from "../components/accessories/categories";
import Products from "../components/accessories/products";

const Accessories = ({
  role,
  token,
  setMessage,
  setShow,
  setType,
  setRole,
  setToken,
}) => {
  const logoutHandler = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="./">Accessories</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Button variant="outline-danger" onClick={logoutHandler()}>
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/categories/:category"
          element={
            // <Protected token={token} role={role}>
            <Products
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
            // </Protected>
          }
        />
        <Route
          path="/*"
          element={
            // <Protected token={token} role={role}>
            <Categories
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
            // </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default Accessories;
