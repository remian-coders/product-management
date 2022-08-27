import React, { forwardRef } from "react";

const HomeTable = forwardRef(({ registers, report, role = "user" }, ref) => {
  return (
    <div className="px-3" ref={ref}>
      <div className="container-fuild mt-5">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Tichet Nr.</th>
              <th scope="col">Cost</th>
              <th scope="col">Payment type</th>
              <th scope="col">Timestamp</th>
              {role === "admin" && <th scope="col">Role</th>}
              <th scope="col">Mentiune</th>
            </tr>
          </thead>
          <tbody>
            {registers.map(
              ({ id, ticketNo, cost, paymentType, date, admin, others }) => (
                <tr key={id}>
                  <th>{ticketNo}</th>
                  <td>{cost}</td>
                  <td>{paymentType}</td>
                  <td>{new Date(date).toLocaleString()}</td>
                  {role === "admin" && <td>{admin}</td>}
                  <td>{others}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <p className="fw-bold">Raport:</p>
          </div>
          <div className="col">
            <p className="fw-bold">Cash: {report.cash ? report.cash : 0} RON</p>
          </div>
          <div className="col">
            <p className="float-end fw-bold">
              Card: {report.card ? report.card : 0} RON
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomeTable;
