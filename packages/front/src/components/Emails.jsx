import React, { useState, useEffect, useCallback, useRef } from "react";
import { createEmail, deleteEmail, fetchEmails } from "../utils/api-calls";
import { Container, Spinner } from "react-bootstrap";

const Emails = ({ token, setMessage, setType, setShow }) => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const emailRef = useRef();

  const getEmails = useCallback(async () => {
    const response = await fetchEmails(token);

    if (response.status === 200) {
      setEmails(response.data.emails);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  const addEmailHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const response = await createEmail(token, { email });

    if (response.status === 200) {
      emailRef.current.value = "";
      setMessage(response.data.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getEmails();
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };

  const deleteEmailHandler = async (id) => {
    const response = await deleteEmail(token, id);
    if (response.status === 200) {
      setMessage(response.data.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getEmails();
    } else {
      setMessage(response.data.message);
      setType("danger");
      setShow(true);
    }
  };
  return (
    <>
      <div className="container mt-5 py-5">
        <form onSubmit={addEmailHandler}>
          <div className="input-group mb-3">
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              placeholder="name@example.com"
              aria-label="email"
              aria-describedby="button-addon2"
              required
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon2"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="container">
        {isLoading ? (
          <Container className="d-flex mt-5 pt-5 justify-content-center align-items-center">
            <Spinner animation="border" />
          </Container>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.map(({ id, email }, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{email}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        deleteEmailHandler(id);
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

export default Emails;
