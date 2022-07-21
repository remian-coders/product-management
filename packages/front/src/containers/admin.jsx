import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  UserCreate,
  Emails,
  Navbar,
  IpAddress,
  CsvUpload,
  CsvUpdate,
  PasswordUpdate,
} from "../components";

const Admin = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/csv-upload" element={<CsvUpload />} />
        <Route path="/csv-update" element={<CsvUpdate />} />
        <Route path="/password-update" element={<PasswordUpdate />} />
        <Route path="/ip-address" element={<IpAddress />} />
        <Route path="/user" element={<UserCreate />} />
        <Route path="/*" element={<Emails />} />
      </Routes>
    </>
  );
};

export default Admin;
