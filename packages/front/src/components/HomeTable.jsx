import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const HomeTable = forwardRef(({ registers, report, role }, ref) => {
  const navigate = useNavigate();
  console.log(registers);
  const searchHandler = (ticketNo) => {
    navigate(`/search/${ticketNo}`);
  };
  return (
		<div className="px-3" ref={ref}>
			<div className="container-fluid mt-5">
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th scope="col">Tichet Nr.</th>
							<th scope="col">Payment type</th>
							<th scope="col">Time</th>
							<th scope="col">Payment Amount(RON)</th>
							<th scope="col">Others</th>
							{role === 'admin' && <th scope="col">Name</th>}
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody>
						{registers.map(
							({
								id,
								paymentType,
								paymentAmount,
								date,
								admin,
								register,
								others,
							}) => (
								<tr key={id}>
									<th>
										{register.ticketNo}
										{register.registerType ===
											'accessory' &&
											register.accessoryName}
										{register.registerType === 'expense' &&
											'Expense'}
									</th>
									<td>{paymentType}</td>
									<td>{new Date(date).toLocaleString()}</td>
									<td>{paymentAmount}</td>
									<td>{others}</td>
									{role === 'admin' && <td>{admin}</td>}
									<td>
										{register.paymentStatus ===
										'complete' ? (
											<button
												type="button"
												className="btn btn-success btn-sm"
												disabled={!register.ticketNo}
												onClick={() =>
													searchHandler(
														register.ticketNo
													)
												}
											>
												{register.paymentStatus}
											</button>
										) : (
											<button
												type="button"
												className="btn btn-warning btn-sm"
												onClick={() =>
													searchHandler(
														register.ticketNo
													)
												}
											>
												{register.paymentStatus}
											</button>
										)}
									</td>
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
						<p className="fw-bold">
							Cash: {report.cash ? report.cash : 0} RON
						</p>
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
