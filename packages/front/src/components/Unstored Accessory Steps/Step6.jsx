import React from "react";

const Step6 = ({ step, values, handleChange }) => {
  if (step !== 6) {
    return null;
  }
  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="inputMentiune"
          className="col-5 col-form-label"
          style={{ fontSize: "26pt" }}
        >
          Mentiune
        </label>
        <input
          value={values.others}
          onChange={handleChange}
          style={{ height: "70px", fontSize: "26pt" }}
          name="others"
          type="text"
          className="form-control col-7"
          id="inputMentiune"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default Step6;
