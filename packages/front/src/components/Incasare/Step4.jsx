import React from "react";

const Step4 = ({ step, values, handleChange }) => {
  if (step !== 4) {
    return null;
  }
  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="paymentAmount"
          className="col-5 col-form-label"
          style={{ fontSize: "26pt" }}
        >
          Paid Money(RON)
        </label>
        <input
          value={values.paymentAmount}
          onChange={handleChange}
          style={{ height: "70px", fontSize: "26pt" }}
          name="paymentAmount"
          type="number"
          className="form-control col-7"
          id="paymentAmount"
          min="0"
          autoComplete="off"
          autoFocus
        />
      </div>
    </>
  );
};

export default Step4;
