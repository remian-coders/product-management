import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container text-center p-5">
      <form className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded">
        <h3 className="mb-3">Welcome to the Admin Page</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
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
