import React, { useCallback, useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import { deleteIssue, fetchIssues } from "../utils/api-calls";

const Issues = ({ setMessage, setShow, setType, token }) => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIssues = useCallback(async () => {
    const response = await fetchIssues(token);

    if (response.status === 200 || response.status === 201) {
      setIssues(response.data.data.issues);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getIssues();
  }, [getIssues]);

  const deleteIssueHandler = async (id) => {
    const response = await deleteIssue(token, id);

    if (response.status === 200 || response.status === 201) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getIssues();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };
  return (
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
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(({ id, date, type, description }, index) => (
              <tr
                key={index}
                className={
                  (type === "cost-difference" && "bg-info") ||
                  (type === "older-than-7-days" && "bg-warning")
                }
              >
                <th>{index + 1}</th>
                <td>{new Date(date).toLocaleString()}</td>
                <td>{type}</td>
                <td>{description}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deleteIssueHandler(id);
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
  );
};

export default Issues;
