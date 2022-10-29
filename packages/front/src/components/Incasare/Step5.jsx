import React from "react";

const Step5 = ({ step, values, handleChange }) => {
  if (step !== 5) {
    return null;
  }
  return (
    <>
      <div className="row my-4 input-group input-group-lg">
        <label
          htmlFor="inputMentiune"
          className="col-5 col-form-label"
          style={{ "font-size": "26pt" }}
        >
          Mentiune
        </label>
        <input
          value={values.others}
          onChange={handleChange}
          style={{ height: "70px", "font-size": "26pt" }}
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

export default Step5;
