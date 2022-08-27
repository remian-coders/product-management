import React from "react";

const Step2 = ({ step, values, handleChange }) => {
  if (step !== 2) {
    return null;
  }

  return (
    <>
      <div className="row my-4">
        <label htmlFor="inputCost" className="col-sm-3 col-form-label">
          Cost(RON)
        </label>
        <div className="col-sm-9">
          <input
            value={values.cost}
            onChange={handleChange}
            name="cost"
            type="number"
            className="form-control"
            id="inputCost"
            min="0"
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
