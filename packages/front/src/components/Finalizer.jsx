import React from "react";

const Finalizer = (props) => {
  const date = new Date().toISOString().slice(0, 10);
  return (
    <div className="container px-4 py-4">
      <div className="row gx-5">
        <div className="col">
          <div className="p-3">
            <h3>Registru casa</h3>
          </div>
        </div>
        <div className="col">
          <div className="p-3">
            <h3>{date}</h3>
          </div>
        </div>
        <div className="col">
          <div className="p-3">
            <button type="button" className="btn btn-danger btn-lg">
              Finalizare zi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalizer;
