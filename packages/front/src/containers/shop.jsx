import { Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ShopCategories from "../components/shop/ShopCategories";
import ShopBrands from "../components/shop/ShopBrands";
import {
  fetchAccessories,
  fetchCategories,
  sellAccessory,
} from "../utils/api-calls";
import ShopProtected from "../utils/shop-protected";
import AccessoryModal from "../components/shop/AccessoryModal";
import { useNavigate } from "react-router-dom";

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
    console.log(formData);
    const response = await sellAccessory(token, accessory.id, formData);

    console.log(response);

    if (response.status === 200) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIncasare(false);
      setFormData({
        quantity: "",
        paymentType: "",
        others: "",
        paymentAmount: "",
      });
      navigate(0);
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  return (
    <div className="d-flex">
      <div
        className="flex-column flex-shrink-0 p-3 bg-light sticky-top scrollspy-example-2"
        data-bs-smooth-scroll="true"
        style={{ width: "280px", height: "100vh" }}
      >
        <a
          href={role === "admin" ? "/admin" : "/"}
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use href="#bootstrap"></use>
          </svg>
          <span className="fs-4">Home</span>
        </a>
        <hr />
        <ul
          className="p-0"
          style={{ height: "78%", overflow: "hidden", overflowY: "scroll" }}
        >
          {categories.map(({ id, name }) => (
            <li key={id} className="nav-item" style={{ listStyleType: "none" }}>
              <a
                href={`/shop/categories/${id}`}
                className="nav-link"
                aria-current="page"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
        <hr />
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
