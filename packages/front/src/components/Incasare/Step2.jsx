import React from "react";

const Step2 = ({ step, values, handleChange }) => {
  if (step !== 2) {
    return null;
  }

  return (
    <>
      <div className="row my-4">
        <h3>Tip plata</h3>
        <div className="d-flex col-8 justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentType"
              style={{ height: "35px", width: "35px", marginRight: "15px" }}
              onChange={handleChange}
              value="cash"
              id="paymentType1"
              checked={values.paymentType === "cash"}
            />
            <label
              className="form-check-label"
              htmlFor="paymentType1"
              style={{ "font-size": "26pt" }}
            >
              Cash
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input "
              type="radio"
              name="paymentType"
              onChange={handleChange}
              style={{ height: "35px", width: "35px", marginRight: "15px" }}
              id="paymentType2"
              value="card"
              checked={values.paymentType === "card"}
            />
            <label
              className="form-check-label"
              htmlFor="paymentType2"
              style={{ "font-size": "26pt" }}
            >
              Card
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
