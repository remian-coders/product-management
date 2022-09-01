import React from "react";
import { Modal, Alert, Button } from "react-bootstrap";

const PlataModal = ({ show, submitHandler, onHide, cost, mentiune }) => {
  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Plata</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body className="fs-5">
          <div className="mb-3 input-group input-group-lg">
            <label htmlFor="inputCost" className="col-4 col-form-label">
              Cost(RON)
            </label>
            <input
              ref={cost}
              type="number"
              className="form-control col-8"
              id="inputCost"
              min="0"
              required
              autoComplete="off"
              autoFocus
            />
          </div>

          <div className="mb-3 input-group input-group-lg">
            <label htmlFor="inputMentiune" className="col-4 col-form-label">
              Mentiune
            </label>
            <input
              ref={mentiune}
              type="text"
              className="form-control col-8"
              id="inputMentiune"
              autoComplete="off"
            />
          </div>
          <div className="row px-2">
            <Alert variant="warning">Toate campurile sunt obligatorii!</Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" size="lg">
            Save
          </Button>
          <Button variant="secondary" onClick={onHide} size="lg">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PlataModal;
