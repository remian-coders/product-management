import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";

import { ForgotForm, LoginForm, RecoveryForm } from "../components";
import { login } from "../utils/api-calls";

const Login = ({ setIsLoggedIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(email, password);

    const response = await login({ email, password });

    if (response.status === 200) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Routes>
      <Route path="/forgot" element={<ForgotForm />} />
      <Route path="/recovery" element={<RecoveryForm />} />
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
