import React from "react";
import FinalizerModal from "./FinalizerModal";
import { ToggleButton } from "./Buttons/index";

const Finalizer = ({
  updateScheduler,
  scheduler = null,
  finalizeHandle,
  role = "user",
}) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="container  py-4">
        <div className="row gx-5">
          <div className="col">
            <div className="py-3">
              <h3>
                Registru casa:{" "}
                {role === "user" && new Date().toLocaleDateString()}
              </h3>
            </div>
          </div>
          <div className="col">
            <div className="py-3 float-end">
              {role === "admin" && (
                <ToggleButton
                  scheduler={scheduler}
                  updateScheduler={updateScheduler}
                />
              )}
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
