import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import { Finalizer, HomeTable, IncasareModal, PlataModal, Loading } from ".";
import {
  getAdminRegister,
  postAdminRegister,
  setWorkingHours,
  patchFinalizeRegister,
  fetchAllRegisters,
} from "../utils/api-calls";

const AdminIncasare = ({
  token,
  setMessage,
  setType,
  setShow,
  getWorkingHours,
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

  const printCompRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printCompRef.current,
  });

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

  useEffect(() => {
    getAllRegisters(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getAllRegisters]);

  const incasareHandle = async (formData, setFormData) => {
    const response = await postAdminRegister(token, formData);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIncasare(false);
      getAllRegisters();
      setFormData({
        ticketNo: "",
        cost: "",
        paymentType: "",
        others: "",
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
      cost,
      others,
    });
    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setPlata(false);
      getAllRegisters();

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
      getAllRegisters({ from, to });
    }
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
      <Finalizer finalizeHandle={finalizeHandle} role="admin" />

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
