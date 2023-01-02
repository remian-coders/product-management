import { Route, Routes, Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import ShopCategories from "../components/shop/ShopCategories";
import ShopBrands from "../components/shop/ShopBrands";
import {
  fetchAccessories,
  fetchCategories,
  sellAccessory,
  sellUnstoredAccessory,
} from "../utils/api-calls";
import ShopProtected from "../utils/shop-protected";
import AccessoryModal from "../components/shop/AccessoryModal";
import UnstoredAccessoryModal from "../components/shop/UnstoredAccessoryModal";
import { useNavigate } from "react-router-dom";
import classes from "./shop.module.css";

const Shop = ({ role, token, setMessage, setShow, setType }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const [incasare, setIncasare] = useState(false);
  const [unstored, setUnstored] = useState(false);

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
      setType("success");
      setShow(true);
      setFormData({
        quantity: "",
        paymentType: "",
        others: "",
        paymentAmount: "",
      });
      setAccessory({});
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const unstoredHandle = async (formData, setFormData) => {
    const response = await sellUnstoredAccessory(token, formData);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setUnstored(false);
      setType("success");
      setShow(true);
      setFormData({
        quantity: "",
        paymentType: "",
        others: "",
        paymentAmount: "",
        price: "",
        acceesoryName: "",
      });
      //   setTimeout(() => {
      //     navigate(0);
      //   }, 2000);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

	return (
		<div>
			<nav className={`${classes.nav} bg-light border-bottom`}>
				<div className={`${classes['nav-div1']} container-fluid`}>
					<span className="navbar-brand mb-0 h1">
						<Link to={role === 'admin' ? '/admin' : '/'}>
							<button
								className={`btn btn-outline-secondary right`}
							>
								Go Back
							</button>
						</Link>
					</span>
				</div>
				<div className={`${classes['nav-div2']} container-fluid`}>
					<h3> Vanzare Accesorii</h3>
				</div>
			</nav>
			<div className={`container`}>
				<div className="container">
					<div className="container border p-3 rounded mt-3">
						<div>
							<div
								className="btn btn-link"
								style={{ fontSize: '1.5rem', color: 'red' }}
								onClick={() => setUnstored(true)}
							>
								Accesorii nelistate
							</div>
						</div>
						<div className={classes.list}>
							{categories.map(({ id, name }) => (
								<div key={id}>
									<a
										className="btn btn-link"
										href={`/shop/categories/${id}`}
										aria-current="page"
									>
										{name}
									</a>
								</div>
							))}
						</div>
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
				<UnstoredAccessoryModal
					show={unstored}
					onHide={() => {
						setUnstored(false);
					}}
					submitHandler={unstoredHandle}
				/>
			</div>
		</div>
	);
};

export default Shop;
