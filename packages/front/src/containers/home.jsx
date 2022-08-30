import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  Header,
  Finalizer,
  HomeTable,
  IncasareModal,
  PlataModal,
  Loading,
} from "../components";

import {
  fetchRegisters,
  createRegister,
  patchFinalizeRegister,
} from "../utils/api-calls";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = ({ setMessage, setType, setShow, token, role }) => {
  const [incasare, setIncasare] = useState(false);
  const [plata, setPlata] = useState(false);

  const [loading, setLoading] = useState(true);
  const [registers, setRegisters] = useState([]);
  const [report, setReport] = useState({});

  const plataCost = useRef();
  const plataMentiune = useRef();

  const navigate = useNavigate();

  const getRegisters = useCallback(async () => {
    const response = await fetchRegisters(token);

    if (response.status === 200) {
      setRegisters(response.data.data.registers);
      setReport(response.data.data.report);
      setLoading(false);
    } else if (response.status === 403) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getRegisters(); // run it, run it

    return () => {
      // this now gets called when the component unmounts
    };
  }, [getRegisters]);

  useEffect(() => {
    if (!token || role !== "cashier") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  const incasareHandle = async (formData, setFormData) => {
    const response = await createRegister(formData, token);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIncasare(false);
      getRegisters();
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

    const response = await createRegister({ cost, others }, token);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setPlata(false);
      getRegisters();

      plataCost.current.value = "";
      plataMentiune.current.value = "";
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Finalizer finalizeHandle={finalizeHandle} />
          <Container className="p-0">
            <HomeTable registers={registers} report={report} />
          </Container>
          <div className="container px-4 py-5">
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={() => setIncasare(true)}
                >
                  Incasare
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
      )}
    </>
  );
};

export default Home;
