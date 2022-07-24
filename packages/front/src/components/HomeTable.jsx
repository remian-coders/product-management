import React from "react";

const HomeTable = ({ registers }) => {
  return (
    <>
      <div className="container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Tichet Nr.</th>
              <th scope="col">Cost</th>
              <th scope="col">Payment type</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Mentiune</th>
            </tr>
          </thead>
          <tbody>
            {registers.map(
              ({ id, ticketNo, cost, paymentType, date, others }) => (
                <tr key={id}>
                  <th>{ticketNo}</th>
                  <td>{cost}</td>
                  <td>{paymentType}</td>
                  <td>{new Date(date).toTimeString().split(" ")[0]}</td>
                  <td>{others}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="container px-4 mt-5">
        <div className="row">
          <div className="col-6 border">
            <h4>Raport:</h4>
          </div>
          <div className="col border">
            <h4>Cash: 115 RON</h4>
          </div>
          <div className="col border">
            <h4>Card: 50 RON</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTable;
