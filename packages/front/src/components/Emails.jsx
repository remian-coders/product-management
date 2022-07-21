import React from "react";

const Emails = () => {
  return (
    <>
      <div class="container mt-5 py-5">
        <div class="input-group mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="name@example.com"
            aria-label="email"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-success"
            type="button"
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </div>

      <div class="container">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Tony</td>
              <td>Ferguson</td>
              <td>tony@ferguson.com</td>
              <td class="d-flex justify-content-center">
                <button type="button" class="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Jack</td>
              <td>Shore</td>
              <td>jack@shore.com</td>
              <td class="d-flex justify-content-center">
                <button type="button" class="btn btn-outline-danger">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Lily</td>
              <td>Andy</td>
              <td>lily@andy.com</td>
              <td class="d-flex justify-content-center">
                <button type="button" class="btn btn-outline-danger">
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

export default Emails;
