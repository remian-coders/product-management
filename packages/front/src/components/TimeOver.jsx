import React from "react";

const TimeOver = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">503</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Page is closed.
        </p>
        <p className="lead">
          The page you’re looking for can be accessed during the work hours.
        </p>
      </div>
    </div>
  );
};

export default TimeOver;
