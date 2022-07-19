import React from "react";

const UserCreate = () => {
  return (
    <div className="container border p-5 rounded">
      <form className="row g-3">
        <div className="col-md-6">
          <label for="validationDefault01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            required
          />
        </div>
        <div className="col-md-6">
          <label for="validationDefault02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault02"
            required
          />
        </div>
        <div className="col-md-6">
          <label for="validationDefaultEmail" className="form-label">
            Email
          </label>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              id="validationDefaultEmail"
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <label for="validationDefaultPassword" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              id="validationDefaultPassword"
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary float-end" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
