import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useBackButtonManager } from '../contexts/BackButtonContext';
import { miniApp } from '@telegram-apps/sdk-react';
import { useCart } from "../contexts/CartContext";
import { isEmpty } from "../utils/isEmpty";
import "./Cart.scss";
import qs from "qs";

const CartPage = () => {
  const { user, isLoading, balance, changeParameter, loadUser } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const { action, clear } = useBackButtonManager();
  const { getAllProducts, getCountById, deleteProduct, addCount, reduceCount } = useCart();
  const [products, setProducts] = useState([]);

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
    action(() => navigate("/"));
    loadProducts();
    return () => {
      clear();
    };
  }, []);

  const _deleteProduct = (id) => {
    deleteProduct(id);
    loadProducts();
  }

  const _addCount = (id) => {
    addCount(id);
    loadProducts();
  }

  const _reduceCount = (id) => {
    reduceCount(id);
    loadProducts();
  }

  const summ = products.reduce((accumulator, current) => (accumulator + current.price * getCountById(current.id)), 0)

  return (
    <>
      <div className="cart-page">
        <h1 className="mb-4 mt-3">Корзина</h1>
        <div className="row">
          {products.map((myproduct) => (
            <div className={`col col-12 mb-3`}>
              <div class="card">
                <img src="/images/krossovki.png" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">{myproduct.name} ({myproduct.brand})</h5>
                  <p class="card-text">Цена: {myproduct.price}р / {getCountById(myproduct.id)} шт</p>
                  {isEmpty(myproduct.description) ? (<></>) : (<p class="card-text">{myproduct.description}</p>)}
                  <div className="btn-delete-container">
                    <button onClick={() => {_reduceCount(myproduct.id)}} className="btn btn-success"><i class="bi bi-dash"></i></button>
                    <button onClick={() => {_addCount(myproduct.id)}} className="btn btn-success"><i class="bi bi-plus"></i></button>
                    <button onClick={() => {_deleteProduct(myproduct.id)}} className="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="price-container mb-3">
          Итог: {summ}р
        </div>
        {products.length == 0 ? (<></>): (
          <div>
            <div className="btn-container">
              <button onClick={() => {navigate("/order")}} className="btn btn-primary">Оформить заказ</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartPage;
