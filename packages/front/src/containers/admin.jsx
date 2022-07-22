import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  UserCreate,
  Emails,
  Navbar,
  IpAddress,
  CsvFile,
  PasswordUpdate,
} from "../components";

const Admin = ({ isLoggedIn, token, setMessage, setType, setShow }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    // else {
    //   navigate("/admin");
    // }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/csv" element={<CsvFile />} />
        <Route path="/password-update" element={<PasswordUpdate />} />
        <Route
          path="/ip-address"
          element={
            <IpAddress
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
          }
        />
        <Route
          path="/user"
          element={
            <UserCreate
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
          }
        />
        <Route
          path="/*"
          element={
            <Emails
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Admin;
