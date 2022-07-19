import React from "react";
import { Modal, Alert, Button } from "react-bootstrap";

const PlataModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Inregistrare incasare noua
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-3">
            <label for="inputTichet" className="col-sm-3 col-form-label">
              Tichet
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="inputTichet" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputCost" className="col-sm-3 col-form-label">
              Cost(RON)
            </label>
            <div className="col-sm-9">
              <input type="number" className="form-control" id="inputCost" />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputMentiune" className="col-sm-3 col-form-label">
              Mentiune
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="inputMentiune" />
            </div>
          </div>
          <div className="row px-2">
            <Alert variant="warning">Toate campurile sunt obligatorii!</Alert>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Save</Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlataModal;
