import React from "react";

const HomeTable = (props) => {
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
            <tr>
              <th>602225</th>
              <td>225</td>
              <td>Cash</td>
              <td>10:01</td>
              <td>smth</td>
            </tr>
            <tr>
              <th>Payment xx</th>
              <td>-100</td>
              <td>------</td>
              <td>14:05</td>
              <td>smth</td>
            </tr>
            <tr>
              <th>602214</th>
              <td>50</td>
              <td>Card</td>
              <td>14:11</td>
              <td>smth</td>
            </tr>
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
