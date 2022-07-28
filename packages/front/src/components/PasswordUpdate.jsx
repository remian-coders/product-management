import React, { useRef } from "react";
import { updatePassword } from "../utils/api-calls";

const PasswordUpdate = ({ token, setToken, setMessage, setShow, setType }) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const response = await updatePassword(token, { oldPassword, newPassword });

    if (response.status === 200) {
      setToken(response.data.token);
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      oldPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };
  return (
    <div className="container border p-5 rounded">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Old Password
          </label>
          <input
            ref={oldPasswordRef}
            type="password"
            className="form-control"
            id="validationDefault01"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            New Password
          </label>
          <input
            ref={newPasswordRef}
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
