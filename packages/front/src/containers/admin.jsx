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
import AdminIncasare from "../components/AdminIncasare";

const Admin = ({
  isLoggedIn,
  token,
  setMessage,
  setType,
  setShow,
  setToken,
}) => {
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
        <Route path="/incasare" element={<AdminIncasare />} />
        <Route
          path="/csv"
          element={
            <CsvFile
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
            />
          }
        />
        <Route
          path="/password-update"
          element={
            <PasswordUpdate
              token={token}
              setMessage={setMessage}
              setShow={setShow}
              setType={setType}
              setToken={setToken}
            />
          }
        />
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
