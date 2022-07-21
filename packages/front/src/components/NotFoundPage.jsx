import React from "react";

const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">401</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Unauthorized request.
        </p>
        <p className="lead">
          The page you’re looking for can be accessed by certian people.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
