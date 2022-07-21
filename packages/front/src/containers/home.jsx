import React, { useState, useEffect } from "react";

import {
  Header,
  Finalizer,
  HomeTable,
  IncasareModal,
  PlataModal,
  Loading,
  NotFoundPage,
} from "../components";

const Home = () => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Finalizer />
          <HomeTable />
          <div className="container px-4 mt-5">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => setIncasare(true)}
                >
                  Incasare
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary btn-lg float-end"
                  onClick={() => setPlata(true)}
                >
                  Plata
                </button>
              </div>
            </div>
          </div>
          <IncasareModal show={incasare} onHide={() => setIncasare(false)} />
          <PlataModal show={plata} onHide={() => setPlata(false)} />
        </>
      )}

      <NotFoundPage />
    </>
  );
};

export default Home;
