import React from "react";

const CsvUpdate = () => {
  return (
    <div className="container mt-5 py-5">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="formFile"
          placeholder="CSV file path"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-success"
          type="button"
          id="button-addon2"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CsvUpdate;
