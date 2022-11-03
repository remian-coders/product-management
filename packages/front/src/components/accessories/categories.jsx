import React, { useCallback, useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

const Categories = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = useCallback(async () => {
    // const response = await fetchCategories(token);
    // if (response.status === 200 || response.status === 201) {
    //   setCategories(response.data.data.categories);
    //   setIsLoading(false);
    // }
  }, [token]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const deleteIssueHandler = async (id) => {
    // const response = await deleteIssue(token, id);
    // if (response.status === 200 || response.status === 201) {
    //   setMessage(response.data?.message);
    //   setType("success");
    //   setShow(true);
    //   setIsLoading(true);
    //   getCategories();
    // } else {
    //   setMessage(response.data?.message);
    //   setType("danger");
    //   setShow(true);
    // }
  };
  return (
    <>
      <div className="container mt-5 py-5">
        <form>
          <div className="input-group mb-3">
            <input
              //   ref={emailRef}
              type="email"
              className="form-control"
              placeholder="Add a new category"
              aria-label="email"
              aria-describedby="button-addon2"
              required
              autoComplete="off"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon2"
            >
              Save
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
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(({ id, date, type, description }, index) => (
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
    </>
  );
};

export default Categories;
