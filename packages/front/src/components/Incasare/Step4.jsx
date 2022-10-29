import React from "react";

const Step4 = ({ step, values, handleChange }) => {
  if (step !== 4) {
    return null;
  }
  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="amountPaid"
          className="col-5 col-form-label"
          style={{ "font-size": "26pt" }}
        >
          Paid Money(RON)
        </label>
        <input
          value={values.amountPaid}
          onChange={handleChange}
          style={{ height: "70px", "font-size": "26pt" }}
          name="amountPaid"
          type="number"
          className="form-control col-7"
          id="amountPaid"
          min="0"
          autoComplete="off"
          autoFocus
        />
      </div>
    </>
  );
};

export default Step4;
