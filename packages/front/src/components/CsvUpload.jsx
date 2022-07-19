import React from "react";

const CsvUpload = () => {
  return (
    <div className="container mt-5 py-5">
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          id="formFile"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-success"
          type="button"
          id="button-addon2"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CsvUpload;
