import React from "react";
import FinalizerModal from "./FinalizerModal";

const Finalizer = ({ finalizeHandle }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="container  py-4">
        <div className="row gx-5">
          <div className="col">
            <div className="py-3">
              <h3>Registru casa - {new Date().toLocaleDateString()}</h3>
            </div>
          </div>

          <div className="col">
            <div className="py-3 float-end">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setModalShow(true)}
              >
                Finalizare zi
              </button>
            </div>
          </div>
        </div>
      </div>
      <FinalizerModal
        finalizeHandle={finalizeHandle}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Finalizer;
