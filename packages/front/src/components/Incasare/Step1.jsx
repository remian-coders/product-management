import React from "react";

const Step1 = ({ step, handleChange, values }) => {
  if (step !== 1) {
    return null;
  }

  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="inputTichet"
          className="col-4 col-form-label"
          style={{ fontSize: "26pt" }}
        >
          Tichet
        </label>
        <input
          type="number"
          name="ticketNo"
          style={{ height: "70px", fontSize: "26pt" }}
          className="form-control col-8"
          id="inputTichet"
          value={values.ticketNo}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
        />
      </div>
    </>
  );
};

export default Step1;
