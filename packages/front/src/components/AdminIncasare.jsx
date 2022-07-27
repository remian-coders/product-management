import React, { useState, useRef, useCallback, useEffect } from "react";

import { Finalizer, HomeTable, IncasareModal, PlataModal, Loading } from ".";
import {
  fetchRegisters,
  getAdminRegister,
  postAdminRegister,
  setWorkingHours,
  finalizeRegister,
} from "../utils/api-calls";

const AdminIncasare = ({ token, setMessage, setType, setShow }) => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [report, setReport] = useState({});

  const incasareTicket = useRef();
  const incasareCost = useRef();
  const incasareMentiune = useRef();
  const incasareType = useRef();

  const plataTicket = useRef();
  const plataCost = useRef();
  const plataMentiune = useRef();

  const fromRef = useRef();
  const toRef = useRef();

  const dateRef = useRef();
  const selectRef = useRef();

  const getHomeRegisters = useCallback(async (params = null) => {
    const response = await fetchRegisters(params);
    if (response.status === 200) {
      setRegisters(response.data.data.registers);
      setReport(response.data.data.report);
      setLoading(false);
    } else {
      setRegisters([]);
      setLoading(false);
    }
  }, []);

  const getRegisters = useCallback(
    async (params = null) => {
      const response = await getAdminRegister(token, params);
      if (response.status === 200) {
        setRegisters(response.data.data.registers);
        setReport(response.data.data.report);
        setLoading(false);
      } else {
        setRegisters([]);
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    getRegisters(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getRegisters]);

  const incasareHandle = async (e) => {
    e.preventDefault();
    const ticketNo = incasareTicket.current.value;
    const cost = incasareCost.current.value;
    const paymentType = incasareType.current.value;
    const others = incasareMentiune.current.value;
    const response = await postAdminRegister(token, {
      ticketNo,
      cost,
      paymentType,
      others,
    });

    if (response.status === 200) {
      setMessage("Incasare realizata cu succes!");
      setType("success");
      setShow(true);
      setIncasare(false);
      getRegisters();
      incasareTicket.current.value = "";
      incasareCost.current.value = "";
      incasareMentiune.current.value = "";
      incasareType.current.value = "";
    } else {
      setMessage("Eroare la incasare!");
      setType("error");
      setShow(true);
    }
  };

  const plataHandle = async (e) => {
    e.preventDefault();
    const ticketNo = plataTicket.current.value;
    const cost = plataCost.current.value * -1;
    const others = plataMentiune.current.value;
    const response = await postAdminRegister(token, { ticketNo, cost, others });
    if (response.status === 200) {
      setMessage("Plata realizata cu succes!");
      setType("success");
      setShow(true);
      setPlata(false);
      getRegisters();
      plataTicket.current.value = "";
      plataCost.current.value = "";
      plataMentiune.current.value = "";
    } else {
      setMessage("Eroare la plata!");
      setType("error");
      setShow(true);
    }
  };

  const handleWorkingHours = async (e) => {
    e.preventDefault();

    const from = fromRef.current.value;
    const to = toRef.current.value;

    const response = await setWorkingHours(token, { from, to });

    if (response.status === 200) {
      setMessage("Orele au fost setate cu succes!");
      setType("success");
      setShow(true);
      fromRef.current.value = "";
      toRef.current.value = "";
    } else {
      setMessage("Eroare la setarea orelor!");
      setType("error");
      setShow(true);
    }
  };

  const handleBrowse = async (e) => {
    e.preventDefault();

    const date = dateRef.current.value;
    const select = selectRef.current.value;

    if (select === "admin") {
      setLoading(true);
      getRegisters({ date });
    } else {
      setLoading(true);
      getHomeRegisters({ date });
    }
  };

  const finalizeHandle = async (e) => {
    const response = await finalizeRegister();

    if (response.status === 200) {
      setMessage("Finalizare realizata cu succes!");
      setType("success");
      setShow(true);
    } else {
      setMessage("Eroare la finalizare!");
      setType("error");
      setShow(true);
    }
  };

  return (
    <>
      <Finalizer finalizeHandle={finalizeHandle} />
      <div className="container pb-5">
        <form onSubmit={handleWorkingHours}>
          <div className="input-group mb-3">
            <input
              ref={fromRef}
              type="time"
              className="form-control"
              placeholder="From"
              aria-label="time"
              aria-describedby="button-addon2"
              required
            />
            <input
              ref={toRef}
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
              Set today's working hours
            </button>
          </div>
        </form>
      </div>
      <div className="container pb-5">
        <form onSubmit={handleWorkingHours}>
          <div className="input-group mb-3">
            <input
              ref={fromRef}
              type="time"
              className="form-control"
              placeholder="From"
              aria-label="time"
              aria-describedby="button-addon2"
              required
            />
            <input
              ref={toRef}
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
              Set daily working hours
            </button>
          </div>
        </form>
      </div>
      <div className="container pb-5">
        <form onSubmit={handleBrowse}>
          <div className="input-group mb-3">
            <input
              ref={dateRef}
              type="date"
              className="form-control"
              placeholder="Choose a date"
              aria-label="date"
              aria-describedby="button-addon2"
              required
            />
            <select
              ref={selectRef}
              className="form-control"
              id="inputGroupSelect02"
            >
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

      {loading ? (
        <Loading height=" " />
      ) : (
        <HomeTable registers={registers} report={report} />
      )}
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
  );
};

export default AdminIncasare;
