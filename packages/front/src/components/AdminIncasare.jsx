import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

import { Finalizer, HomeTable, IncasareModal, PlataModal, Loading } from ".";
import {
  getAdminRegister,
  postAdminRegister,
  setWorkingHours,
  patchFinalizeRegister,
  fetchAllRegisters,
  getTicketByNumber,
  searchTicketNumber,
} from "../utils/api-calls";

const AdminIncasare = ({
  role,
  token,
  setMessage,
  setType,
  setShow,
  getWorkingHours,
  updateScheduler,
  scheduler,
}) => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [report, setReport] = useState({});

  const plataCost = useRef();
  const plataMentiune = useRef();

  const fromRef = useRef();
  const toRef = useRef();
  const typeRef = useRef();

  const fromDateRef = useRef();
  const toDateRef = useRef();
  const selectRef = useRef();

  const ticketNo = useRef();

  const navigate = useNavigate();

  const printCompRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printCompRef.current,
  });

  const getAllTransactions = useCallback(
    async (params = null) => {
      const response = await fetchAllRegisters(token, params);

      if (response.status === 200) {
        setRegisters(response.data.data.payments);
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
        setRegisters(response.data.data.payments);
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
    getAllTransactions(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getAllTransactions]);

  const incasareHandle = async (formData, setFormData) => {
    const response = await postAdminRegister(token, formData);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIncasare(false);
      getAllTransactions();
      setFormData({
        registerType: "service",
        ticketNo: "",
        cost: "",
        paymentType: "",
        others: "",
        paymentAmount: "",
      });
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const plataHandle = async (e) => {
    e.preventDefault();

    const cost = plataCost.current.value * -1;
    const others = plataMentiune.current.value;
    const response = await postAdminRegister(token, {
      registerType: "expense",
      cost,
      others,
    });
    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setPlata(false);
      getAllTransactions();

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

    const from = fromDateRef.current.value;
    const to = toDateRef.current.value;
    const select = selectRef.current.value;

    if (select === "admin") {
      setLoading(true);
      getRegisters({ from, to });
    } else {
      setLoading(true);
      getAllTransactions({ from, to });
    }
  };
  const getTicketNumber = useCallback(
    async (ticketNo) => {
      let response;
      if (role === "cashier") {
        response = await getTicketByNumber(token, ticketNo);
      } else if (role === "admin") {
        response = await searchTicketNumber(token, ticketNo);
      }

      if (response.data.data.register) {
        if (response.data.data.register.paymentStatus === "complete") {
          return true;
        } else {
          navigate(`/search/${ticketNo}`);
        }
      } else {
        return false;
      }
    },
    [token, role, navigate]
  );
  const handleSearch = async (e) => {
    e.preventDefault();

    navigate(`/search/${ticketNo.current.value}`);
  };

  const finalizeHandle = async (e) => {
    const response = await patchFinalizeRegister(token);

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
      <Finalizer
        finalizeHandle={finalizeHandle}
        role="admin"
        updateScheduler={updateScheduler}
        scheduler={scheduler}
      />
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

      <div className="container pb-5">
        <form onSubmit={handleBrowse}>
          <div className="input-group mb-3">
            <input
              ref={fromDateRef}
              type="date"
              className="form-control"
              placeholder="Choose a date"
              aria-label="date"
              aria-describedby="button-addon2"
              required
            />
            <input
              ref={toDateRef}
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
              <option value="all">All</option>
              <option value="admin">Admin</option>
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
      <div className="container pb-2">
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              ref={ticketNo}
              type="text"
              className="form-control"
              placeholder="Search by ticketNo"
              aria-label="text"
              aria-describedby="button-addon3"
              required
              autoComplete="off"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon3"
            >
              Search
            </button>
          </div>
        </form>
        <div className="container py-2">
          <div className="row">
            <div className="col ">
              <button
                type="button"
                className="btn btn-primary "
                onClick={() => setIncasare(true)}
              >
                Incasare
              </button>
            </div>
            <div className="col d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary "
                onClick={() => navigate("/shop")}
              >
                Sell Accessory
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary  float-end"
                onClick={() => setPlata(true)}
              >
                Plata
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading height=" " />
      ) : (
        <>
          <Container className="p-0">
            <HomeTable
              token={token}
              role="admin"
              registers={registers}
              report={report}
              ref={printCompRef}
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

      <IncasareModal
        getTicketNumber={getTicketNumber}
        show={incasare}
        onHide={() => setIncasare(false)}
        submitHandler={incasareHandle}
      />
      <PlataModal
        show={plata}
        onHide={() => setPlata(false)}
        submitHandler={plataHandle}
        cost={plataCost}
        mentiune={plataMentiune}
      />
    </>
  );
};

export default AdminIncasare;
