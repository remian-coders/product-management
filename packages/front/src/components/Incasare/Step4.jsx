import React from "react";

const Step4 = ({ step, values, handleChange }) => {
  if (step !== 4) {
    return null;
  }
  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label htmlFor="inputMentiune" className="col-4 col-form-label">
          Mentiune
        </label>
        <input
          value={values.others}
          onChange={handleChange}
          name="others"
          type="text"
          className="form-control col-8"
          id="inputMentiune"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default Step4;
