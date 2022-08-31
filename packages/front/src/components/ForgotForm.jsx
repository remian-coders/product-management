import React from "react";

const ForgotForm = ({ forgotHandler, email, loading }) => {
  return (
    <div className="container text-center p-5">
      <form
        onSubmit={forgotHandler}
        className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto p-5 mt-5 border rounded"
      >
        <h3 className="mb-3">Enter your email</h3>
        <div className="mb-3">
          <input
            ref={email}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ForgotForm;
