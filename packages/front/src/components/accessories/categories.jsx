import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import { addNewCategory, deleteCategory } from "../../utils/api-calls";

const Categories = ({
  categories,
  getCategories,
  token,
  setMessage,
  setShow,
  setType,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const categoryRef = useRef();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const deleteCategoryHandler = async (id) => {
    setIsLoading(true);
    const response = await deleteCategory(token, id);
    if (response.status === 200 || response.status === 201) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getCategories();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
    setIsLoading(false);
  };
  const addCategoryHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = categoryRef.current.value;
    const response = await addNewCategory(token, { name });
    if (response.status === 200 || response.status === 201) {
      setMessage(response.data?.message);
      categoryRef.current.value = "";
      setType("success");
      setShow(true);
      getCategories();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="container-fluid">
      <div className="container p-5">
        <form onSubmit={addCategoryHandler}>
          <div className="input-group mb-3">
            <input
              ref={categoryRef}
              type="text"
              className="form-control"
              placeholder="Add a new category"
              aria-label="text"
              aria-describedby="button-addon2"
              required
              autoComplete="off"
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
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(({ id, name }, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>
                    <a href={`/accessories/categories/${id}`}>view</a>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        deleteCategoryHandler(id);
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
    </div>
  );
};

export default Categories;
