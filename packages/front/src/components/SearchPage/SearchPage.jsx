import React, { useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  searchTicketNumber,
  getTicketByNumber,
  makePaymentAdmin,
  makePaymentCashier,
} from "../../utils/api-calls";

import classes from "./SearchPage.module.css";
const SearchPage = ({ role, token, setMessage, setShow, setType }) => {
  let { ticketNo } = useParams();

  const [register, setRegister] = useState({});
  const [payments, setPayments] = useState([]);
  const [notfound, setNotfound] = useState(false);

  const getTicket = useCallback(async () => {
    let response;
    if (role === "cashier") {
      response = await getTicketByNumber(token, ticketNo);
    } else if (role === "admin") {
      response = await searchTicketNumber(token, ticketNo);
    }

    if (response.data.data.register) {
      setRegister(response.data.data.register);
      setPayments(response.data.data.register.payments);
    } else {
      setNotfound(true);
    }
  }, [token, ticketNo, role]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  const formHandler = async (e) => {
    e.preventDefault();
    const paymentType = e.target.paymentType.value;
    const paymentAmount = e.target.paymentAmount.value;

    const data = { paymentAmount, paymentType, ticketNo };

    let response;

    if (role === "cashier") {
      response = await makePaymentCashier(token, data);
    } else if (role === "admin") {
      response = await makePaymentAdmin(token, data);
    }

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      e.target.reset();
      getTicket();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };
  return (
    <>
      <div>
        <nav className="navbar bg-light border-bottom">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">
              <Link to={role === "admin" ? "/admin" : "/"}>
                <button className={`btn btn-outline-secondary right`}>
                  Go Back
                </button>
              </Link>
            </span>
          </div>
        </nav>
      </div>
      {notfound ? (
        <div className="container">
          <h2
            className="alert alert-danger text-center container mt-5"
            role="alert"
          >
            Ticket has not been found!
          </h2>
        </div>
      ) : (
        <div className="container">
          <div className={`${classes.container} container p-2`}>
            <div className={`${classes.cart} mb-3`}>
              <form className="row g-3" onSubmit={formHandler}>
                <div className="col-md-6">
                  <label
                    htmlFor="paymentAmount"
                    className={`${classes["form-label"]} form-label`}
                  >
                    Payment Amount(RON)
                  </label>
                  <input
                    type="number"
                    className={`${classes["form-input"]} form-control`}
                    id="paymentAmount"
                    required
                    autoComplete="off"
                    min="0"
                  />
                </div>

                <div className="">
                  <p className={classes["form-label"]}>Payment Type</p>
                  <div className={`${classes["form-radio-btns"]}`}>
                    <div className={`${classes["form-check1"]} form-check`}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentType"
                        value="cash"
                        id="gridRadios1"
                        required
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Cash
                      </label>
                    </div>
                    <div className={`${classes["form-check2"]} form-check`}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentType"
                        id="gridRadios2"
                        value="card"
                        required
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        Card
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-2 pt-3">
                  <button
                    type="submit"
                    className={`${classes.btn} btn btn-success right`}
                    disabled={register.paymentStatus === "complete"}
                  >
                    Complete
                  </button>
                </div>
              </form>
            </div>
            <div className={`${classes.cart} d-flex mb-3`}>
              <div className="col-6">
                <h6>Ticket Number: {ticketNo} </h6>
                <h6>Cost: {register.cost}(RON)</h6>
                <h6>Payment Status: {register.paymentStatus}</h6>
                <h6>Type: {register.registerType}</h6>
              </div>
              <div className="col-6">
                <h6>Date: {new Date(register.date).toLocaleString()}</h6>
                <h6>Paid: {register.paid}(RON)</h6>
                <h6>Unpaid: {register.unPaid}(RON)</h6>
              </div>
            </div>

            <div className={`${classes.cart} list-group mb-3`}>
              {payments.map(
                ({ id, paymentType, paymentAmount, date, admin }) => (
                  <div
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                    key={id}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        Amount Paid: {paymentAmount}
                        (RON)
                      </h5>

                      <p>{new Date(date).toLocaleString()}</p>
                    </div>
                    <p className="mb-1">
                      Payment recorded by: {admin ? admin : "cashier"}
                    </p>
                    <p>Payment Type: {paymentType}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
