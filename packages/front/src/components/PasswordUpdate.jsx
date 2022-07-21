import React from "react";

const PasswordUpdate = () => {
  return (
    <div className="container border p-5 rounded">
      <form className="row g-3">
        <div className="col-md-6">
          <label for="validationDefault01" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationDefault01"
            required
          />
        </div>
        <div className="col-md-6">
          <label for="validationDefault02" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationDefault02"
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary float-end" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdate;
