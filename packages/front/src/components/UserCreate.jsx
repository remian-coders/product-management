import React, { useCallback, useState, useRef, useEffect } from "react";
import { createUser, fetchUsers } from "../utils/api-calls";

const UserCreate = ({ token, setMessage, setType, setShow }) => {
  const [users, setUsers] = useState([]);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const getUsers = useCallback(async () => {
    const response = await fetchUsers(token);

    if (response.status === 200) {
      setUsers(response.data.users);
      // setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const createUserHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await createUser(token, { name, email, password });

    if (response.status === 200) {
      emailRef.current.value = "";
      setMessage(response.data.message);
      setType("success");
      setShow(true);
      getUsers();
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  return (
    <div className="container border p-5 rounded">
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="validationDefault01" className="form-label">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            id="validationDefault01"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefaultEmail" className="form-label">
            Email
          </label>
          <div className="input-group">
            <input
              ref={emailRef}
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
          <label htmlFor="validationDefaultPassword" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              ref={passwordRef}
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
