import React from "react";
import { Modal, Alert, Button } from "react-bootstrap";

const PlataModal = ({ show, submitHandler, onHide, cost, mentiune }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Inregistrare incasare noua
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="row mb-3">
            <label htmlFor="inputCost" className="col-sm-3 col-form-label">
              Cost(RON)
            </label>
            <div className="col-sm-9">
              <input
                ref={cost}
                type="number"
                className="form-control"
                id="inputCost"
                min="0"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputMentiune" className="col-sm-3 col-form-label">
              Mentiune
            </label>
            <div className="col-sm-9">
              <input
                ref={mentiune}
                type="text"
                className="form-control"
                id="inputMentiune"
              />
            </div>
          </div>
          <div className="row px-2">
            <Alert variant="warning">Toate campurile sunt obligatorii!</Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PlataModal;
