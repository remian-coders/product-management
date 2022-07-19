import React from "react";
import { Routes, Route } from "react-router-dom";
import { ForgotForm, LoginForm, RecoveryForm } from "../components";

const Login = () => {
  return (
    <Routes>
      <Route path="/forgot" element={<ForgotForm />} />
      <Route path="/recovery" element={<RecoveryForm />} />
      <Route path="/*" element={<LoginForm />} />
    </Routes>
  );
};

export default Login;
