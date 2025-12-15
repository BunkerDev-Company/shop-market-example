import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useBackButtonManager } from '../contexts/BackButtonContext';
import { miniApp } from '@telegram-apps/sdk-react';
import { useCart } from "../contexts/CartContext";
import { isEmpty } from "../utils/isEmpty";
import "./Order.scss";
import qs from "qs";

const OrderPage = () => {
  const { user, isLoading, balance, changeParameter, loadUser } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const { action, clear } = useBackButtonManager();
  const { getAllProducts, getCountById, clearAll } = useCart();
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    fio: user?.fio || "",
    city: user?.city || "",
    address: user?.address || "",
    is_pickup: user?.is_pickup || false
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const loadProducts = async () => {
    const ids = getAllProducts().map(p => p.id);
    const _products = await axios.get("https://localhost:7128/api/Product/CartProducts", { 
      params: { ids },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }) });
    setProducts(_products.data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    miniApp.setBackgroundColor('#FFFFFF');
    miniApp.setHeaderColor('#FFFFFF');
    action(() => navigate("/cart"));
    loadProducts();

    return () => {
      clear();
    };
  }, []);

  const sendOrder = async () => {
    const listProduct = getAllProducts();
    const request = {
        idUser: user.id,
        fio: form.fio,
        address: form.address,
        city: form.city,
        isPickup: form.is_pickup,
        products: listProduct
      }

      await axios.post("https://localhost:7128/api/Order/SendOrder", request);

      clearAll();
      navigate("/success");
  }

  const summ = products.reduce((accumulator, current) => (accumulator + current.price * getCountById(current.id)), 0);

  return (
    <div className="order-page container mb-5">
      <h1 className="mb-4 mt-3">Оформление заказа</h1>

      {/* Блок данных пользователя / доставки */}
      <div className="card mb-4">
        <div className="card-body">

          <h5 className="card-title mb-3">Данные для доставки</h5>

          <div className="row g-3">

            <div className="col-12 col-md-6">
              <label className="form-label">ФИО</label>
              <input
                type="text"
                className="form-control"
                value={form.fio}
                onChange={(e) => updateField("fio", e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Город</label>
              <input
                type="text"
                className="form-control"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Адрес доставки</label>
              <input
                type="text"
                className="form-control"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>

            <div className="col-12">
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pickupCheck"
                  checked={form.is_pickup}
                  onChange={(e) => updateField("is_pickup", e.target.checked)}
                />
                <label className="form-check-label" htmlFor="pickupCheck">
                  Самовывоз
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Товары */}
      <div className="card mb-4">
        <div className="card-body">

          <h5 className="card-title mb-3">Товары в заказе</h5>

          {products.length === 0 && (
            <div className="alert alert-secondary">Корзина пуста</div>
          )}

          {products.length > 0 && (
            <ul className="list-group list-group-flush">

              {products.map(p => (
                <li key={p.id} className="list-group-item py-3">

                  <div className="row align-items-center">

                    {/* картинка */}
                    <div className="col-3 col-md-2">
                      <img
                        src="/images/krossovki.png"
                        className="img-fluid rounded"
                        alt={p.name}
                      />
                    </div>

                    <div className="col-6 col-md-7">
                      <h6 className="mb-1">{p.name}</h6>
                      <small className="text-muted">
                        {getCountById(p.id)} шт.
                      </small>
                    </div>

                    <div className="col-3 col-md-3 text-end">
                      <strong>{p.price * getCountById(p.id)} ₽</strong>
                    </div>

                  </div>

                </li>
              ))}

            </ul>
          )}

        </div>
      </div>

      {/* Итог */}
      <div className="card mb-4">
        <div className="card-body">

          <h5 className="card-title mb-3">Итог</h5>

          <div className="d-flex justify-content-between fs-5 mb-3">
            <span>Сумма заказа:</span>
            <strong>{summ} ₽</strong>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fs-5"
            onClick={() => sendOrder()}
          >
            Оформить заказ
          </button>

        </div>
      </div>

    </div>
  )
}

export default OrderPage;
