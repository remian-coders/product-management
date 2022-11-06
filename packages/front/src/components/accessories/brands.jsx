import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  addNewAccessory,
  deleteCategory,
  editCategory,
  fetchAccessories,
  fetchBrands,
} from "../../utils/api-calls";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Brands = ({ token, setMessage, setType, setShow, getCategories }) => {
  const [brands, setBrands] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { category } = useParams();

  const categoryNameRef = useRef();

  const getBrands = useCallback(async () => {
    const response = await fetchBrands(token, category);

    if (!response.data.data.category) return navigate("/accessories");
    if (response.status === 200) {
      setBrands(response.data.data.brands);
      categoryNameRef.current.value = response.data.data.category.name;
      setIsLoading(false);
    }
  }, [token, category, navigate]);

  const getAccessories = useCallback(
    async (categoryId, brand) => {
      const response = await fetchAccessories(token, categoryId, brand);
      if (response.status === 200) {
        setAccessories(response.data.data.accessories);
      }
    },
    [token]
  );

  useEffect(() => {
    getBrands();
    getAccessories(category);
  }, [getBrands, getAccessories, category]);

  const deleteCategoryHandler = async (e) => {
    e.preventDefault();
    const response = await deleteCategory(token, category);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const updateCategoryHandler = async (e) => {
    e.preventDefault();
    const response = await editCategory(token, category, {
      name: categoryNameRef.current.value,
    });

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getBrands();
      getAccessories(category);
      getCategories();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const addAccessoryHandler = async (e) => {
    e.preventDefault();
    const brand = e.target.brand.value;
    const name = e.target.name.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const location = e.target.location.value;

    const response = await addNewAccessory(token, {
      brand,
      name,
      price,
      quantity,
      location,
      categoryId: category,
    });

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getBrands();
      getAccessories(category, brand);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="container border p-3 rounded mt-3">
        <form className="row g-3" onSubmit={addAccessoryHandler}>
          <div className="col-md-6">
            <label htmlFor="validationDefault01" className="form-label">
              Category Name
            </label>
            <input
              ref={categoryNameRef}
              type="text"
              className="form-control"
              id="validationDefault01"
              required
              autoComplete="off"
            />
          </div>
          <div className="d-flex gap-5 col-6 mt-5">
            <button className="btn btn-primary" onClick={updateCategoryHandler}>
              Update
            </button>
            <button className="btn btn-danger" onClick={deleteCategoryHandler}>
              Delete
            </button>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultEmail" className="form-label">
              Brand
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Brand of the product"
                name="brand"
                id="validationDefaultEmail"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultEmail" className="form-label">
              Name
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name of the product"
                name="name"
                id="validationDefaultEmail"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultEmail" className="form-label">
              Price
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Price of the product"
                name="price"
                id="validationDefaultEmail"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultEmail" className="form-label">
              Quantity
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity of the product"
                name="quantity"
                id="validationDefaultEmail"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultEmail" className="form-label">
              Location
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Location of the product"
                name="location"
                id="validationDefaultEmail"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary float-end">Add</button>
          </div>
        </form>
        <div className="col-12 d-flex gap-2">
          {brands.map((brand, index) => (
            <button
              key={index}
              className="btn btn-outline-dark"
              onClick={() => {
                getAccessories(category, brand);
              }}
            >
              {brand}
            </button>
          ))}
        </div>
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
                <th scope="col">Brand</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Location</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {accessories.map(
                (
                  { id, brand, name, price, quantity, location, category },
                  index
                ) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{name}</td>
                    <td>{brand}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{location}</td>
                    <td>{category.name}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => {
                          navigate(`/accessories/accessory/${id}`);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Brands;
