import React, { useCallback, useState, useEffect } from 'react';
import { fetchAccessories, fetchBrands } from '../../utils/api-calls';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './ShopBrands.module.css';
const Brands = ({ token, setAccessory, setIncasare }) => {
	const [brands, setBrands] = useState([]);
	const [accessories, setAccessories] = useState([]);
	const navigate = useNavigate();

	const { category } = useParams();

	const getBrands = useCallback(async () => {
		const response = await fetchBrands(token, category);

		if (!response.data.data.category) return navigate('/accessories');
		if (response.status === 200) {
			setBrands(response.data.data.brands);
		}
	}, [token, category, navigate]);

	const getAccessories = useCallback(
		async (categoryId, brand) => {
			const response = await fetchAccessories(token, categoryId, brand);
			if (response.status === 200) {
				setAccessories(response.data.data.accessories);
			}
		},
		[token]
	);

	useEffect(() => {
		getBrands();
		getAccessories(category);
	}, [getBrands, getAccessories, category]);

	return (
		<div className={`container`}>
			<div className="container border p-3 rounded mt-3">
				<div className="col-12 d-flex gap-2">
					{brands.map((brand, index) => (
						<button
							key={index}
							className={`btn btn-outline-secondary ${classes.brand}`}
							onClick={() => {
								getAccessories(category, brand);
							}}
						>
							{brand}
						</button>
					))}
				</div>
			</div>

			<div className={`${classes.container}`}>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Brand</th>
							<th scope="col">Model</th>
							<th scope="col">Price(RON)</th>
							<th scope="col">Quantity</th>
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
									brand,
									name,
									model,
									price,
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
									<td>{price}</td>
									<td>{quantity}</td>
									<td>{location}</td>
									<td>{category.name}</td>
									<td className="d-flex justify-content-center">
										<button
											type="button"
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

export default Brands;
