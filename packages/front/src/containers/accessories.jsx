import { Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Categories from '../components/accessories/categories';
import Brands from '../components/accessories/brands';
import AccessoryProtected from '../utils/accessory-protected';
import { fetchCategories } from '../utils/api-calls';
import Accessory from '../components/accessories/accessory';

const Accessories = ({
	role,
	token,
	setMessage,
	setShow,
	setType,
	setRole,
	setToken,
}) => {
	const [categories, setCategories] = useState([]);

	const getCategories = useCallback(async () => {
		const response = await fetchCategories(token);

		if (response.status === 200) {
			setCategories(response.data.data.categories);
		}
	}, [token]);

	useEffect(() => {
		getCategories();

		return () => {
			// this now gets called when the component unmounts
		};
	}, [getCategories]);
	const logoutHandler = () => {
		setRole(null);
		setToken(null);
		localStorage.removeItem('user_token');
		localStorage.removeItem('user_role');
	};
	return (
		<div className="d-flex">
			<div
				className="flex-column flex-shrink-0 p-3 bg-light sticky-top scrollspy-example-2"
				data-bs-smooth-scroll="true"
				style={{ width: '280px', height: '100vh' }}
			>
				<a
					href="/accessories"
					className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
				>
					<svg className="bi me-2" width="40" height="32">
						<use href="#bootstrap"></use>
					</svg>
					<span className="fs-4">Categories</span>
				</a>
				<hr />
				<ul
					className="p-0"
					style={{
						height: '78%',
						overflow: 'hidden',
						overflowY: 'scroll',
					}}
				>
					{categories.map(({ id, name }) => (
						<li
							key={id}
							className="nav-item"
							style={{ listStyleType: 'none' }}
						>
							<a
								href={`/accessories/categories/${id}`}
								className="nav-link"
								aria-current="page"
							>
								{name}
							</a>
						</li>
					))}
				</ul>
				<hr />
				<div className="dropdown">
					<button
						type="button"
						className="btn btn-outline-danger"
						onClick={logoutHandler}
					>
						Log out
					</button>
				</div>
			</div>

			<Routes>
				<Route
					path="/categories/:category"
					element={
						<AccessoryProtected token={token} role={role}>
							<Brands
								getCategories={getCategories}
								token={token}
								setMessage={setMessage}
								setShow={setShow}
								setType={setType}
							/>
						</AccessoryProtected>
					}
				/>
				<Route
					path="/accessory/:accessoryId"
					element={
						<AccessoryProtected token={token} role={role}>
							<Accessory
								token={token}
								setMessage={setMessage}
								setShow={setShow}
								setType={setType}
							/>
						</AccessoryProtected>
					}
				/>
				<Route
					path="/*"
					element={
						<AccessoryProtected token={token} role={role}>
							<Categories
								categories={categories}
								getCategories={getCategories}
								token={token}
								setMessage={setMessage}
								setShow={setShow}
								setType={setType}
							/>
						</AccessoryProtected>
					}
				/>
			</Routes>
		</div>
	);
};

export default Accessories;
