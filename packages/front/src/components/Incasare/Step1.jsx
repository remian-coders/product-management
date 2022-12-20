import React from "react";

const Step1 = ({ step, handleChange, values, message }) => {
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
        <div>
          {message && (
            <div className="alert alert-danger" role="alert">
              Use New Ticket Number!
            </div>
          )}
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
      </div>
    </>
  );
};

export default Step1;
