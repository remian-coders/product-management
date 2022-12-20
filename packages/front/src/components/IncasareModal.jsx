import React, { useState } from "react";

import { Form, Modal, Button } from "react-bootstrap";

import Step1 from "./Incasare/Step1";
import Step2 from "./Incasare/Step3";
import Step3 from "./Incasare/Step2";
import Step4 from "./Incasare/Step4";
import Step5 from "./Incasare/Step5";
import MultiStepProgressBar from "./Incasare/ProgressBar";

const IncasareModal = ({ show, submitHandler, onHide, getTicketNumber }) => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(false);

  const [formData, setFormData] = useState({
    registerType: "service",
    ticketNo: "",
    cost: "",
    paymentType: "",
    others: "",
    paymentAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Test current step with ternary
  // _next and _previous functions will be called on button click
  const next = async () => {
    let currentStep = step;
    setMessage(false);
    if (step === 1) {
      let res = await getTicketNumber(formData.ticketNo);
      if (res === false) {
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 4 ? 5 : currentStep + 1;
        setStep(currentStep);
        return;
      } else {
        setMessage(true);
        return;
      }
    }

    currentStep = currentStep >= 4 ? 5 : currentStep + 1;
    setStep(currentStep);
  };

  const prev = () => {
    let currentStep = step;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setStep(currentStep);
  };
  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            onHide();
            setStep(1);
            setFormData({
              registerType: "service",
              ticketNo: "",
              cost: "",
              paymentType: "",
              others: "",
              paymentAmount: "",
            });
            setMessage(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Inregistrare incasare noua
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body className="fs-5">
            <MultiStepProgressBar step={step} />

            <Step1
              step={step}
              values={formData}
              handleChange={handleChange}
              message={message}
            />
            <Step2 step={step} values={formData} handleChange={handleChange} />
            <Step3 step={step} values={formData} handleChange={handleChange} />
            <Step4 step={step} values={formData} handleChange={handleChange} />
            <Step5 step={step} values={formData} handleChange={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            {step !== 1 && (
              <Button
                variant="secondary"
                onClick={prev}
                className="float-start"
                size="lg"
              >
                Previous
              </Button>
            )}
            {step === 1 && (
              <Button
                variant="primary"
                onClick={next}
                className="float-end"
                disabled={formData.ticketNo.length > 0 ? false : true}
                size="lg"
              >
                Next
              </Button>
            )}
            {step === 2 && (
              <Button
                variant="primary"
                onClick={next}
                className="float-end"
                disabled={formData.paymentType.length > 0 ? false : true}
                size="lg"
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button
                variant="primary"
                onClick={next}
                className="float-end"
                size="lg"
                disabled={formData.cost.length > 0 ? false : true}
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <Button
                variant="primary"
                onClick={next}
                className="float-end"
                size="lg"
                disabled={formData.paymentAmount.length > 0 ? false : true}
              >
                Next
              </Button>
            )}
            {step === 5 && (
              <Button
                variant="primary"
                onClick={() => {
                  submitHandler(formData, setFormData);
                  setStep(1);
                }}
                className="float-end"
                size="lg"
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default IncasareModal;
