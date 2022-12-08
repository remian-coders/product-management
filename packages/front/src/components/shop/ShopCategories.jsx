import React from 'react';
import classes from './ShopCategories.module.css';

const ShopCategories = ({ accessories, setAccessory, setIncasare }) => {
	return (
		<div className={`${classes.container}`}>
			<div className="container">
				<h4 className={classes.head4}> All Accessories </h4>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Brand</th>
							<th scope="col">Model</th>
							<th scope="col">Quantity</th>
							<th scope="col">Price(RON)</th>
							<th scope="col">Location</th>
							<th scope="col">Category</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{accessories.map(
							(
								{
									id,
									name,
									brand,
									price,
									model,
									quantity,
									location,
									category,
								},
								index
							) => (
								<tr key={index}>
									<th>{index + 1}</th>
									<td>{name}</td>
									<td>{brand}</td>
									<td>{model}</td>
									<td>{quantity}</td>
									<td>{price}</td>
									<td>{location}</td>
									<td>{category.name}</td>
									<td>
										<button
											className="btn btn-primary"
											onClick={() => {
												setIncasare(true);
												setAccessory({
													id: id,
													name: name,
													cost: price * 1,
													quantity: quantity,
												});
											}}
										>
											Sell
										</button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ShopCategories;
