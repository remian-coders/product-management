import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import { Finalizer, HomeTable, IncasareModal, PlataModal, Loading } from ".";
import {
  getAdminRegister,
  postAdminRegister,
  setWorkingHours,
  finalizeRegister,
  getHours,
  fetchAllRegisters,
} from "../utils/api-calls";

const AdminIncasare = ({
  token,
  setMessage,
  setType,
  setShow,
  setDaily,
  setToday,
}) => {
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
  const typeRef = useRef();

  const dateRef = useRef();
  const selectRef = useRef();

  const printCompRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printCompRef.current,
  });

  const [tableDate, setTableDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const getAllRegisters = useCallback(
    async (params = null) => {
      const response = await fetchAllRegisters(token, params);

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

  const getWorkingHours = useCallback(async () => {
    const response = await getHours(token);

    if (response.status === 200) {
      setDaily(response.data.data.workingHours?.daily);
      setToday(response.data.data.workingHours?.today);
    } else {
      setDaily(null);
      setToday(null);
    }
  }, [token, setDaily, setToday]);

  useEffect(() => {
    getRegisters(); // run it, run it
    getWorkingHours();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getRegisters, getWorkingHours]);

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
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIncasare(false);
      getRegisters();
      incasareTicket.current.value = "";
      incasareCost.current.value = "";
      incasareMentiune.current.value = "";
      incasareType.current.value = "";
    } else {
      setMessage(response.data?.message);
      setType("danger");
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
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setPlata(false);
      getRegisters();
      plataTicket.current.value = "";
      plataCost.current.value = "";
      plataMentiune.current.value = "";
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const handleWorkingHours = async (e) => {
    e.preventDefault();

    const from = fromRef.current.value;
    const to = toRef.current.value;
    const type = typeRef.current.value;

    const response = await setWorkingHours(token, { from, to, type });

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      getWorkingHours();
      fromRef.current.value = "";
      toRef.current.value = "";
    } else {
      setMessage(response.data?.message);
      setType("danger");
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
      setTableDate(date);
    } else {
      setLoading(true);
      getAllRegisters({ date });
      setTableDate(date);
    }
  };

  const finalizeHandle = async (e) => {
    const response = await finalizeRegister();

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
    } else {
      setMessage(response.data?.message);
      setType("danger");
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
              aria-describedby="button-addon1"
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
            <select ref={typeRef} className="form-control">
              <option value="daily">daily</option>
              <option value="today">today</option>
            </select>

            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon2"
            >
              Set working hours
            </button>
          </div>
        </form>
      </div>
      <div className="container pb-2">
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
        <>
          <Container className="p-0">
            <HomeTable
              role="admin"
              registers={registers}
              report={report}
              ref={printCompRef}
              tableDate={tableDate}
            />
          </Container>
          <Container className="p-4">
            <button
              type="button"
              className="btn btn-secondary float-end"
              onClick={handlePrint}
            >
              Print
            </button>
          </Container>
        </>
      )}
      <div className="container px-4 py-5">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIncasare(true)}
            >
              Incasare
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-primary float-end"
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
