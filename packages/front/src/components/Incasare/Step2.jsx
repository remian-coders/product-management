import React from "react";

const Step2 = ({ step, handleChange, values }) => {
  if (step !== 2) {
    return null;
  }

  return (
    <>
      <div className="row my-4">
        <label htmlFor="inputTichet" className="col-sm-3 col-form-label">
          Tichet
        </label>
        <div className="col-sm-9">
          <input
            type="number"
            name="ticketNo"
            className="form-control"
            id="inputTichet"
            value={values.ticketNo}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
