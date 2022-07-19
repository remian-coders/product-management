import React from "react";

const IpAddress = () => {
  return (
    <>
      <div className="container mt-5 py-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="example: 192.168.1.1"
            aria-label="IP Address"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-success"
            type="button"
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </div>
      <div className="container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IP Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>192.168.1.1</td>
              <td className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>192.168.1.1</td>
              <td className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>192.168.1.1</td>
              <td className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IpAddress;
