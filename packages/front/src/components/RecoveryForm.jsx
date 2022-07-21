import React from "react";
import { Link } from "react-router-dom";

const RecoveryForm = ({ password1, password2, recoveryHandler }) => {
  return (
    <div className="container text-center p-5">
      <form
        onSubmit={recoveryHandler}
        className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded"
      >
        <h3 className="mb-3">Updating your password</h3>
        <div className="form-floating mb-3">
          <input
            ref={password1}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">New Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            ref={password2}
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirm Password"
            required
          />
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>
        <div className="mb-3">
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default RecoveryForm;
