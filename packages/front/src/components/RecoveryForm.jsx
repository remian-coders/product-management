import React from "react";
import { Link, useParams } from "react-router-dom";

const RecoveryForm = ({ recoveryHandler }) => {
  const { token } = useParams();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const password = e.target.password1.value;
    const password2 = e.target.password2.value;

    recoveryHandler(password, password2, token);
  };

  return (
    <div className="container text-center p-5">
      <form
        onSubmit={handlePasswordChange}
        className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded"
      >
        <h3 className="mb-3">Updating your password</h3>
        <div className="mb-3">
          <input
            name="password1"
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <input
            name="password2"
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirm Password"
            required
            autoComplete="off"
          />
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
