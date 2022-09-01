import React from "react";

const Step2 = ({ step, handleChange, values }) => {
  if (step !== 2) {
    return null;
  }

  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label htmlFor="inputTichet" className="col-3 col-form-label">
          Tichet
        </label>
        <input
          type="number"
          name="ticketNo"
          className="form-control col-9"
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

export default Step2;
