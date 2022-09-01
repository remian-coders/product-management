import React, { useState, useCallback, useEffect } from "react";
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
import { getHours } from "../utils/api-calls";

const Admin = ({
  token,
  setMessage,
  setType,
  setShow,
  setToken,
  role,
  setRole,
}) => {
  const [today, setToday] = useState(null);
  const [daily, setDaily] = useState(null);

  const getWorkingHours = useCallback(async () => {
    const response = await getHours(token);

    if (response.status === 200) {
      setDaily(response.data.data.workingHours?.daily);
      setToday(response.data.data.workingHours?.today);
    } else {
      setDaily(null);
      setToday(null);
    }
  }, [token, setDaily, setToday]);

  useEffect(() => {
    getWorkingHours();
  }, [getWorkingHours]);

  return (
    <>
      <Navbar
        today={today}
        daily={daily}
        setToken={setToken}
        setRole={setRole}
      />
      <Routes>
        <Route
          path="/csv"
          element={
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
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
            <Protected token={token} role={role}>
              <AdminIncasare
                setDaily={setDaily}
                setToday={setToday}
                token={token}
                setMessage={setMessage}
                setShow={setShow}
                setType={setType}
                getWorkingHours={getWorkingHours}
              />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default Admin;
