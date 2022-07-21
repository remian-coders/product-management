import React from "react";
import { Link } from "react-router-dom";

const ForgotForm = ({ forgotHandler, email }) => {
  return (
    <div className="container text-center p-5">
      <form
        onSubmit={forgotHandler}
        className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded"
      >
        <h3 className="mb-3">Enter your email</h3>
        <div className="form-floating mb-3">
          <input
            ref={email}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="mb-3">
          <Link to="/login" className="text-decoration-none">
            Log in
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotForm;
