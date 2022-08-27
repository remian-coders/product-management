import React, { useRef, useCallback, useState, useEffect } from "react";
import { fetchCsvFile, updateCsvFile, uploadCsvFile } from "../utils/api-calls";

const CsvFile = ({ token, setMessage, setType, setShow }) => {
  const uploadFileRef = useRef();
  const updateFileRef = useRef();

  const [urlPath, setUrlPath] = useState("");

  const getPath = useCallback(async () => {
    const response = await fetchCsvFile(token);

    if (response.status === 200) {
      setUrlPath(response.data?.data?.path?.path);
    }
  }, [token]);

  useEffect(() => {
    getPath();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getPath]);

  const uploadFileHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("csvFile", uploadFileRef.current.files[0]);

    const response = await uploadCsvFile(token, formData);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const updateFileHandler = async (e) => {
    e.preventDefault();

    const path = updateFileRef.current.value;

    const response = await updateCsvFile(token, path);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
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
              autoComplete="off"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
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
              placeholder={`CSV file path: ${urlPath}`}
              aria-describedby="button-addon2"
              required
              autoComplete="off"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
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
