import { Routes, Route } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Admin from "./containers/admin";
import Home from "./containers/home";
import Login from "./containers/login";
import { Toast, ToastContainer } from "react-bootstrap";
import { checkToken } from "./utils/api-calls";
import SearchPage from "./components/SearchPage/SearchPage";
import Accessories from "./containers/accessories";
import Shop from "./containers/shop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(
    "Woohoo, you're reading this text in a Toast!"
  );
  const [type, setType] = useState("success");
  const [token, setToken] = useState(localStorage.getItem("user_token"));
  const [role, setRole] = useState(localStorage.getItem("user_role"));

  const handleToken = useCallback(async () => {
    const response = await checkToken(token);

    if (response.status === 200) {
      setIsLoggedIn(true);
      setRole(response.data?.data?.user?.role);
    } else {
      setToken(null);
      setRole(null);
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_role");
    }
  }, [token]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/search/:ticketNo"
          element={
            <SearchPage
              role={role}
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
          }
        />
        <Route
          path="/accessories/*"
          element={
            <Accessories
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
              role={role}
              setRole={setRole}
            />
          }
        />
        <Route
          path="/shop/*"
          element={
            <Shop
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
              role={role}
              setRole={setRole}
            />
          }
        />
        <Route
          path="/login/*"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
              setRole={setRole}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            <Admin
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
              role={role}
              setRole={setRole}
            />
          }
        />
        <Route
          path="/*"
          element={
            <Home
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setRole={setRole}
              setToken={setToken}
              role={role}
              token={token}
            />
          }
        />
      </Routes>
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg={type}
          delay={1000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Website</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
