import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Admin from "./containers/admin";
import Home from "./containers/home";
import Login from "./containers/login";
import { Toast, ToastContainer } from "react-bootstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(
    "Woohoo, you're reading this text in a Toast!"
  );
  const [type, setType] = useState("success");
  const [token, setToken] = useState(localStorage.getItem("user_token"));

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login/*"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
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
            />
          }
        />
        <Route
          path="/"
          element={
            <Home setMessage={setMessage} setShow={setShow} setType={setType} />
          }
        />
      </Routes>
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg={type}
          delay={4000}
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
