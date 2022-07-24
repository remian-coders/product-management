import React, { useState, useRef, useCallback, useEffect } from "react";

import {
  Finalizer,
  HomeTable,
  IncasareModal,
  PlataModal,
  Loading,
  NotFoundPage,
  TimeOver,
} from ".";

const AdminIncasare = () => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [status, setStatus] = useState("data");

  const incasareTicket = useRef();
  const incasareCost = useRef();
  const incasareMentiune = useRef();
  const incasareType = useRef();

  const plataTicket = useRef();
  const plataCost = useRef();
  const plataMentiune = useRef();

  const getRegisters = useCallback(async () => {
    // const response = await fetchRegisters();
    // if (response.status === 200) {
    //   setRegisters(response.data.data.registers);
    //   setLoading(false);
    // } else if (response.status === 403) {
    //   setLoading(false);
    //   setStatus("not found");
    // } else {
    //   setLoading(false);
    //   setStatus("closed");
    // }
  }, []);

  useEffect(() => {
    // getRegisters(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getRegisters]);

  const incasareHandle = async (e) => {
    // e.preventDefault();
    // const ticketNo = incasareTicket.current.value;
    // const cost = incasareCost.current.value;
    // const paymentType = incasareType.current.value;
    // const others = incasareMentiune.current.value;
    // const response = await createRegister({
    //   ticketNo,
    //   cost,
    //   paymentType,
    //   others,
    // });
    // if (response.status === 200) {
    //   setMessage("Incasare realizata cu succes!");
    //   setType("success");
    //   setShow(true);
    //   setIncasare(false);
    //   getRegisters();
    //   incasareTicket.current.value = "";
    //   incasareCost.current.value = "";
    //   incasareMentiune.current.value = "";
    //   incasareType.current.value = "";
    // } else {
    //   setMessage("Eroare la incasare!");
    //   setType("error");
    //   setShow(true);
    // }
  };

  const plataHandle = async (e) => {
    // e.preventDefault();
    // const ticketNo = plataTicket.current.value;
    // const cost = plataCost.current.value * -1;
    // const others = plataMentiune.current.value;
    // const response = await createRegister({ ticketNo, cost, others });
    // if (response.status === 200) {
    //   setMessage("Plata realizata cu succes!");
    //   setType("success");
    //   setShow(true);
    //   setPlata(false);
    //   getRegisters();
    //   plataTicket.current.value = "";
    //   plataCost.current.value = "";
    //   plataMentiune.current.value = "";
    // } else {
    //   setMessage("Eroare la plata!");
    //   setType("error");
    //   setShow(true);
    // }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : status === "data" ? (
        <>
          <Finalizer />
          <div className="container pb-5">
            <form>
              <div className="input-group mb-3">
                <input
                  type="time"
                  className="form-control"
                  placeholder="From"
                  aria-label="time"
                  aria-describedby="button-addon2"
                  required
                />
                <input
                  type="time"
                  className="form-control"
                  placeholder="To"
                  aria-label="time"
                  aria-describedby="button-addon2"
                  required
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  id="button-addon2"
                >
                  Open Incasare
                </button>
              </div>
            </form>
          </div>
          <div className="container pb-5">
            <form>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Choose a date"
                  aria-label="date"
                  aria-describedby="button-addon2"
                  required
                />
                <select className="form-control " id="inputGroupSelect02">
                  <option value="admin">Admin</option>
                  <option value="all">All</option>
                </select>
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  id="button-addon2"
                >
                  Browse Incasari
                </button>
              </div>
            </form>
          </div>
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
            submitHandler={incasareHandle}
            ticket={incasareTicket}
            cost={incasareCost}
            mentiune={incasareMentiune}
            type={incasareType}
          />
          <PlataModal
            show={plata}
            onHide={() => setPlata(false)}
            submitHandler={plataHandle}
            ticket={plataTicket}
            cost={plataCost}
            mentiune={plataMentiune}
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

export default AdminIncasare;
