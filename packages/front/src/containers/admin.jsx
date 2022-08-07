import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  UserCreate,
  Emails,
  Navbar,
  IpAddress,
  CsvFile,
  PasswordUpdate,
  AdminIncasare,
  Issues,
} from "../components";
import Protected from "../utils/protected";

const Admin = ({ token, setMessage, setType, setShow, setToken }) => {
  const [today, setToday] = useState(null);
  const [daily, setDaily] = useState(null);

  return (
    <>
      <Navbar today={today} daily={daily} />
      <Routes>
        <Route
          path="/csv"
          element={
            <Protected token={token}>
              <CsvFile
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
        <Route
          path="/issues"
          element={
            <Protected token={token}>
              <Issues
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
        <Route
          path="/password-update"
          element={
            <Protected token={token}>
              <PasswordUpdate
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
                setToken={setToken}
              />
            </Protected>
          }
        />
        <Route
          path="/ip-address"
          element={
            <Protected token={token}>
              <IpAddress
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
        <Route
          path="/user"
          element={
            <Protected token={token}>
              <UserCreate
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
        <Route
          path="/emails"
          element={
            <Protected token={token}>
              <Emails
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
        <Route
          path="/*"
          element={
            <Protected token={token}>
              <AdminIncasare
                setDaily={setDaily}
                setToday={setToday}
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
              />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default Admin;
