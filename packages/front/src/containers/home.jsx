import React, { useState, useEffect, useRef } from "react";

import {
  Header,
  Finalizer,
  HomeTable,
  IncasareModal,
  PlataModal,
  Loading,
  NotFoundPage,
  TimeOver,
} from "../components";

import { fetchRegisters } from "../utils/api-calls";

const Home = () => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(true);
  const [registers, setRegisters] = useState([]);
  const [status, setStatus] = useState("data");

  useEffect(() => {
    const getRegisters = async () => {
      const response = await fetchRegisters();
      console.log(response);
      if (response.status === 200) {
        setRegisters(response.data.data);
        setLoading(false);
      } else if (response.status === 403) {
        setLoading(false);
        setStatus("not found");
      } else {
        setLoading(false);
        setStatus("closed");
      }
    };

    getRegisters(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const incasareHandle = async (e) => {
    e.preventDefault();
  };

  const plataHandle = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : status === "data" ? (
        <>
          <Header />
          <Finalizer />
          <HomeTable registers={registers} />
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
          <IncasareModal
            show={incasare}
            onHide={() => setIncasare(false)}
            incasareHandle={incasareHandle}
          />
          <PlataModal
            show={plata}
            onHide={() => setPlata(false)}
            plataHandle={plataHandle}
          />
        </>
      ) : status === "not found" ? (
        <NotFoundPage />
      ) : (
        <TimeOver />
      )}
    </>
  );
};

export default Home;
