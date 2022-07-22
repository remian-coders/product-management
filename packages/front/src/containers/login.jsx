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
}) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const recoveryEmailRef = useRef();
  const recoveryPasswordRef1 = useRef();
  const recoveryPasswordRef2 = useRef();

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
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  const forgotHandler = async (e) => {
    e.preventDefault();

    const email = recoveryEmailRef.current.value;

    const response = await forgotPassword({ email });

    if (response.status === 200) {
      navigate("./recovery");
      setMessage(response.data.message);
      setToken(response.data.data.token);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  const recoveryHandler = async (e) => {
    e.preventDefault();

    const password = recoveryPasswordRef1.current.value;
    const password2 = recoveryPasswordRef2.current.value;

    if (password.localeCompare(password2) !== 0) {
      setMessage("Passwords do not match");
      setType("warning");
      setShow(true);
      return;
    }

    const response = await resetPassword({ token, password });

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
        path="/recovery"
        element={
          <RecoveryForm
            password1={recoveryPasswordRef1}
            password2={recoveryPasswordRef2}
            recoveryHandler={recoveryHandler}
          />
        }
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
