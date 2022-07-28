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
} from "../components";
import Protected from "../utils/protected";

const Admin = ({
  isLoggedIn,
  token,
  setMessage,
  setType,
  setShow,
  setToken,
}) => {
  const [today, setToday] = useState(null);
  const [daily, setDaily] = useState(null);

  return (
    <>
      <Navbar today={today} daily={daily} />
      <Routes>
        <Route
          path="/csv"
          element={
            <Protected isLoggedIn={isLoggedIn}>
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
          path="/password-update"
          element={
            <Protected isLoggedIn={isLoggedIn}>
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
            <Protected isLoggedIn={isLoggedIn}>
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
            <Protected isLoggedIn={isLoggedIn}>
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
            <Protected isLoggedIn={isLoggedIn}>
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
            <Protected isLoggedIn={isLoggedIn}>
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
