import React from "react";
import { useEffect, useCallback, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteAccessory,
  editAccessory,
  fetchAccessory,
} from "../../utils/api-calls";

const Accessory = ({ token, setMessage, setType, setShow }) => {
  const { accessoryId } = useParams();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();

  const brandRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const locationRef = useRef();
  const modelRef = useRef();

  const getAccessory = useCallback(async () => {
    const response = await fetchAccessory(token, accessoryId);

    if (!response.data.data.accessory) return navigate("/accessories");
    if (response.status === 200) {
      brandRef.current.value = response.data.data.accessory.brand;
      nameRef.current.value = response.data.data.accessory.name;
      priceRef.current.value = response.data.data.accessory.price;
      quantityRef.current.value = response.data.data.accessory.quantity;
      locationRef.current.value = response.data.data.accessory.location;
      modelRef.current.value = response.data.data.accessory.model;
      setCategoryId(response.data.data.accessory.category.id);
    }
  }, [token, accessoryId, navigate]);

  useEffect(() => {
    getAccessory();
  }, [getAccessory]);

  const deleteAccessoryHandler = async (e) => {
    e.preventDefault();
    const response = await deleteAccessory(token, accessoryId);
    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getAccessory();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const updateAccessoryHandler = async (e) => {
    e.preventDefault();
    const response = await editAccessory(token, accessoryId, {
      name: nameRef.current.value,
      brand: brandRef.current.value,
      price: priceRef.current.value,
      quantity: quantityRef.current.value,
      location: locationRef.current.value,
      model: modelRef.current.value,
    });

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getAccessory();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  return (
    <div className="container">
      <div className="container border p-3 rounded mt-3">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="validationDefaultBrand" className="form-label">
              Brand
            </label>
            <div className="input-group">
              <input
                ref={brandRef}
                type="text"
                className="form-control"
                placeholder="Brand of the product"
                name="brand"
                id="validationDefaultBrand"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultName" className="form-label">
              Name
            </label>
            <div className="input-group">
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                placeholder="Name of the product"
                name="name"
                id="validationDefaultName"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultModel" className="form-label">
              Model
            </label>
            <div className="input-group">
              <input
                ref={modelRef}
                type="text"
                className="form-control"
                placeholder="Name of the product"
                name="model"
                id="validationDefaultModel"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultPrice" className="form-label">
              Price(RON)
            </label>
            <div className="input-group">
              <input
                ref={priceRef}
                type="number"
                className="form-control"
                placeholder="Price of the product(RON)"
                name="price"
                id="validationDefaultPrice"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultQuantity" className="form-label">
              Quantity
            </label>
            <div className="input-group">
              <input
                ref={quantityRef}
                type="number"
                className="form-control"
                placeholder="Quantity of the product"
                name="quantity"
                id="validationDefaultQuantity"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefaultLocation" className="form-label">
              Location
            </label>
            <div className="input-group">
              <input
                ref={locationRef}
                type="text"
                className="form-control"
                placeholder="Location of the product"
                name="location"
                id="validationDefaultLocation"
                aria-describedby="inputGroupPrepend2"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="d-flex gap-5 col-6 mt-5">
            <button
              className="btn btn-primary"
              onClick={updateAccessoryHandler}
            >
              Update
            </button>
            <button className="btn btn-danger" onClick={deleteAccessoryHandler}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Accessory;
