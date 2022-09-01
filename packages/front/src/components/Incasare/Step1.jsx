import React from "react";

const Step1 = ({ step, values, handleChange }) => {
  if (step !== 1) {
    return null;
  }

  return (
    <>
      <div className="row my-4">
        <h4>Tip plata</h4>
        <div className="d-flex gap-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentType"
              onChange={handleChange}
              value="cash"
              id="paymentType1"
              checked={values.paymentType === "cash"}
            />
            <label className="form-check-label" htmlFor="paymentType1">
              Cash
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentType"
              onChange={handleChange}
              id="paymentType2"
              value="card"
              checked={values.paymentType === "card"}
            />
            <label className="form-check-label" htmlFor="paymentType2">
              Card
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
