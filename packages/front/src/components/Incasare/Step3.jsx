import React from "react";

const Step3 = ({ step, values, handleChange }) => {
  if (step !== 3) {
    return null;
  }

  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label htmlFor="inputCost" className="col-4 col-form-label">
          Cost(RON)
        </label>
        <input
          value={values.cost}
          onChange={handleChange}
          name="cost"
          type="number"
          className="form-control col-8"
          id="inputCost"
          min="0"
          autoComplete="off"
          autoFocus
        />
      </div>
    </>
  );
};

export default Step3;
