import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const IncasareModal = ({
  show,
  submitHandler,
  onHide,
  ticket,
  cost,
  type,
  mentiune,
}) => {
  return (
    <>
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
              <label htmlFor="inputTichet" className="col-sm-3 col-form-label">
                Tichet
              </label>
              <div className="col-sm-9">
                <input
                  ref={ticket}
                  type="text"
                  className="form-control"
                  id="inputTichet"
                  required
                />
              </div>
            </div>
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
              <label htmlFor="inputPlata" className="col-sm-3 col-form-label">
                Tip plata
              </label>
              <div className="col-sm-9">
                <select
                  ref={type}
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputMentiune"
                className="col-sm-3 col-form-label"
              >
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
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default IncasareModal;
