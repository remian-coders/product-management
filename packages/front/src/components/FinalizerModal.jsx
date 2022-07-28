import React from "react";
import { Modal, Button } from "react-bootstrap";

const FinalizerModal = ({ show, finalizeHandle, onHide }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Finalizare zi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Apăsați butonul de continuare pentru a finaliza ziua și a închide
          site-ul.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            finalizeHandle();
            onHide();
          }}
        >
          Continua
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinalizerModal;
