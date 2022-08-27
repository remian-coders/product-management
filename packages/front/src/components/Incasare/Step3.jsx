import React from "react";

const Step3 = ({ step, values, handleChange }) => {
  if (step !== 3) {
    return null;
  }

  return (
    <>
      <div className="row my-4">
        <label htmlFor="inputPlata" className="col-sm-3 col-form-label">
          Tip plata
        </label>
        <div className="col-sm-9">
          <select
            value={values.paymentType}
            onChange={handleChange}
            name="paymentType"
            className="form-select"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Step3;
