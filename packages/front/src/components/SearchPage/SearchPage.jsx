import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  searchTicketNumber,
  getTicketByNumber,
  makePaymentAdmin,
  makePaymentCashier,
} from "../../utils/api-calls";

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
            <span className="navbar-brand mb-0 h1">Search Page</span>
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
          <div className="container p-2">
            <div className="d-flex mb-3">
              <div className="col-6">
                <h6 className="">Ticket Number: {ticketNo} </h6>
                <h6 className="mb-2">Cost: {register.cost}(RON)</h6>
                <h6 className="mb-2">
                  Payment Status: {register.paymentStatus}
                </h6>
                <h6 className="mb-2">Type: {register.registerType}</h6>
              </div>
              <div className="col-6">
                <h6 className="mb-2">
                  Date: {new Date(register.date).toLocaleString()}
                </h6>
                <h6 className="mb-2">Paid: {register.paid}(RON)</h6>
                <h6 className="mb-2">Unpaid: {register.unPaid}(RON)</h6>
              </div>
            </div>
            <div className="list-group mb-3">
              {payments.map(
                ({ id, paymentType, paymentAmount, date, admin }) => (
                  <div
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                    key={id}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        Amount Paid: {paymentAmount}(RON)
                      </h5>

                      <small>{new Date(date).toLocaleString()}</small>
                    </div>
                    <p className="mb-1">
                      Payment recorded by: {admin ? admin : "cashier"}
                    </p>
                    <small>Payment Type: {paymentType}</small>
                  </div>
                )
              )}
            </div>

            <form className="row g-3" onSubmit={formHandler}>
              <div className="col-md-6">
                <label htmlFor="paymentAmount" className="form-label">
                  Payment Amount(RON)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="paymentAmount"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="col-sm-10">
                <div className="form-check">
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
                <div className="form-check">
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

              <div className="col-2 pt-3">
                <button
                  type="submit"
                  className="btn btn-success right"
                  disabled={register.paymentStatus === "complete"}
                >
                  Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
