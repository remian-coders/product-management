import React from "react";

import ProgressBar from "react-bootstrap/ProgressBar";

const MultiStepProgressBar = ({ step }) => {
  let stepPercentage = 0;

  if (step === 1) {
    stepPercentage = 0;
  } else if (step === 2) {
    stepPercentage = 33;
  } else if (step === 3) {
    stepPercentage = 66;
  } else if (step === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return <ProgressBar animated now={stepPercentage} />;
};

export default MultiStepProgressBar;
