import React, { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { ForgotForm, LoginForm, RecoveryForm } from "../components";
import { login, forgotPassword, resetPassword } from "../utils/api-calls";

const Login = ({
  setIsLoggedIn,
  setShow,
  setMessage,
  setType,
  setToken,
  token,
  setRole,
}) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const recoveryEmailRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await login({ email, password });

    if (response.status === 200) {
      setIsLoggedIn(true);
      navigate("/admin");
      setMessage(response.data.message);
      setToken(response.data.token);
      setRole(response.data?.data?.user?.role);
      localStorage.setItem("user_token", response.data.token);
      localStorage.setItem("user_role", response.data?.data?.user?.role);
      setType("success");
      setShow(true);
      if (response.data.data.user.role === "cashier") {
        navigate("/");
      } else if (response.data.data.user.role === "admin") {
        navigate("/admin");
      }
    } else {
      setMessage(response.data.message);
      setRole(null);
      setType("danger");
      setShow(true);
    }
  };

  const forgotHandler = async (e) => {
    e.preventDefault();

    const email = recoveryEmailRef.current.value;

    const response = await forgotPassword({ email });

    if (response.status === 200) {
      setMessage(response.data.message);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  const recoveryHandler = async (password, password2, recoveryToken) => {
    if (password.localeCompare(password2) !== 0) {
      setMessage("Passwords do not match");
      setType("warning");
      setShow(true);
      return;
    }

    const response = await resetPassword({ recoveryToken, password });

    if (response.status === 200) {
      navigate("/login");
      setMessage("Login with your new password!");
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  return (
    <Routes>
      <Route
        path="/forgot"
        element={
          <ForgotForm forgotHandler={forgotHandler} email={recoveryEmailRef} />
        }
      />
      <Route
        path="/recovery/:token"
        element={<RecoveryForm recoveryHandler={recoveryHandler} />}
      />
      <Route
        path="/*"
        element={
          <LoginForm
            loginHandler={loginHandler}
            email={emailRef}
            password={passwordRef}
          />
        }
      />
    </Routes>
  );
};

export default Login;
