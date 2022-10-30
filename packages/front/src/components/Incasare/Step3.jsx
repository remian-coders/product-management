import React from "react";

const Step3 = ({ step, values, handleChange }) => {
  if (step !== 3) {
    return null;
  }

  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="inputCost"
          className="col-5 col-form-label"
          style={{ fontSize: "26pt" }}
        >
          Cost(RON)
        </label>
        <input
          value={values.cost}
          onChange={handleChange}
          style={{ height: "70px", fontSize: "26pt" }}
          name="cost"
          type="number"
          className="form-control col-7"
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
