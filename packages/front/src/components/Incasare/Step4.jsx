import React from "react";

const Step4 = ({ step, values, handleChange }) => {
  if (step !== 4) {
    return null;
  }
  return (
    <>
      <div className="row my-4">
        <label htmlFor="inputMentiune" className="col-sm-3 col-form-label">
          Mentiune
        </label>
        <div className="col-sm-9">
          <input
            value={values.others}
            onChange={handleChange}
            name="others"
            type="text"
            className="form-control"
            id="inputMentiune"
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default Step4;
