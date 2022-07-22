import React, { useCallback, useState, useRef, useEffect } from "react";
import { createUser, deleteUser, fetchUsers } from "../utils/api-calls";
import { Container, Spinner } from "react-bootstrap";

const UserCreate = ({ token, setMessage, setType, setShow }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const getUsers = useCallback(async () => {
    const response = await fetchUsers(token);

    if (response.status === 200 || response.status === 201) {
      setUsers(response.data.data.users);
      setIsLoading(false);
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

    if (response.status === 200 || response.status === 201) {
      emailRef.current.value = "";
      nameRef.current.value = "";
      passwordRef.current.value = "";
      setMessage(response.data.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getUsers();
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  const deleteUserHandler = async (id) => {
    const response = await deleteUser(token, id);
    if (response.status === 200 || response.status === 201) {
      setMessage(response.data.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getUsers();
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  return (
    <>
      <div className="container border p-5 rounded">
        <form className="row g-3" onSubmit={createUserHandler}>
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

      <div className="container pt-5 ">
        {isLoading ? (
          <Container className="d-flex mt-5 pt-5 justify-content-center align-items-center">
            <Spinner animation="border" />
          </Container>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, email, name }, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        deleteUserHandler(id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserCreate;
