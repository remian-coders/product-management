import React, { useRef } from "react";

const CsvFile = ({ token, setMessage, setType, setShow }) => {
  const uploadFileRef = useRef();
  const updateFileRef = useRef();

  const uploadFileHandler = async (e) => {
    e.preventDefault();
  };

  const updateFileHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container mt-5 py-5">
        <form onSubmit={uploadFileHandler}>
          <div className="input-group mb-3">
            <input
              ref={uploadFileRef}
              type="file"
              className="form-control"
              id="formFile"
              aria-describedby="button-addon2"
              accept=".csv"
              required
            />
            <button
              className="btn btn-outline-success"
              type="button"
              id="button-addon2"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className="container py-5">
        <form onSubmit={updateFileHandler}>
          <div className="input-group mb-3">
            <input
              ref={updateFileRef}
              type="text"
              className="form-control"
              id="formFile"
              placeholder="CSV file path"
              aria-describedby="button-addon2"
              required
            />
            <button
              className="btn btn-outline-success"
              type="button"
              id="button-addon2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CsvFile;
