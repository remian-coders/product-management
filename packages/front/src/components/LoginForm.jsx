import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ loginHandler, password, email }) => {
  return (
    <div className="container text-center p-5">
      <form
        onSubmit={loginHandler}
        className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded"
      >
        <h3 className="mb-3">Log in</h3>
        <div className="form-floating mb-3">
          <input
            ref={email}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            ref={password}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            autoComplete="off"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="mb-3">
          <Link to="./forgot" className="text-decoration-none">
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
