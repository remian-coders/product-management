import { Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import ShopCategories from '../components/shop/ShopCategories';
import ShopBrands from '../components/shop/ShopBrands';
import {
	fetchAccessories,
	fetchCategories,
	sellAccessory,
} from '../utils/api-calls';
import ShopProtected from '../utils/shop-protected';
import AccessoryModal from '../components/shop/AccessoryModal';
import { useNavigate } from 'react-router-dom';
import classes from './shop.module.css';

const Shop = ({ role, token, setMessage, setShow, setType }) => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [accessories, setAccessories] = useState([]);

	const [incasare, setIncasare] = useState(false);

	const [accessory, setAccessory] = useState({});

	const getCategories = useCallback(async () => {
		const response = await fetchCategories(token);

		if (response.status === 200) {
			setCategories(response.data.data.categories);
		}
	}, [token]);

	const getAccessories = useCallback(async () => {
		const response = await fetchAccessories(token);

		if (response.status === 200) {
			setAccessories(response.data.data.accessories);
		}
	}, [token]);

	useEffect(() => {
		getCategories(); // run it, run it
		getAccessories();
		return () => {
			// this now gets called when the component unmounts
		};
	}, [getCategories, getAccessories]);

	const incasareHandle = async (formData, setFormData, id) => {
		const response = await sellAccessory(token, accessory.id, formData);

		if (response.status === 200) {
			setMessage(response.data?.message);
			setIncasare(false);
			setType('success');
			setShow(true);
			setFormData({
				quantity: '',
				paymentType: '',
				others: '',
				paymentAmount: '',
			});
			setAccessory({});
			setTimeout(() => {
				navigate(0);
			}, 2000);
		} else {
			setMessage(response.data?.message);
			setType('danger');
			setShow(true);
		}
	};

	return (
		<div className={`${classes.container} container`}>
			<a
				href={role === 'admin' ? '/admin' : '/'}
				className={`${classes['home-link']} btn btn-outline-primary`}
			>
				<span className={classes['home-text']}> ❮ Home</span>
			</a>
			<div className={classes.nav}>
				<h3 className={classes.head3}> Accessory</h3>
			</div>
			<div className="container">
				<div className="container border p-3 rounded mt-3">
					<ul className={classes.list}>
						{categories.map(({ id, name }) => (
							<li key={id}>
								<a
									className="btn btn-link"
									href={`/shop/categories/${id}`}
									aria-current="page"
								>
									{name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<Routes>
				<Route
					path="/categories/:category"
					element={
						<ShopProtected token={token} role={role}>
							<ShopBrands
								setAccessory={setAccessory}
								setIncasare={setIncasare}
								token={token}
							/>
						</ShopProtected>
					}
				/>
				<Route
					path="/*"
					element={
						<ShopProtected token={token} role={role}>
							<ShopCategories
								setAccessory={setAccessory}
								setIncasare={setIncasare}
								accessories={accessories}
							/>
						</ShopProtected>
					}
				/>
			</Routes>
			<AccessoryModal
				accessory={accessory}
				show={incasare}
				onHide={() => {
					setIncasare(false);
					setAccessory({});
				}}
				submitHandler={incasareHandle}
			/>
		</div>
	);
};

export default Shop;
