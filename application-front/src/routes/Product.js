import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import "./Main.scss";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../utils/isEmpty";
import axios from "axios";
import Header from "../components/Header";
import MyProduct from "../components/MyProduct";
import Review from "../components/Review";
import { useBackButtonManager } from "../contexts/BackButtonContext";
import { miniApp } from '@telegram-apps/sdk-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState(null);
  const { action, clear } = useBackButtonManager();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    miniApp.setBackgroundColor('#FFFFFF');
    miniApp.setHeaderColor('#FFFFFF');
    action(() => navigate("/"));
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const _product = await axios.get(`https://localhost:7128/api/Product/One?id=${id}`);
        setProduct(_product.data);
      }
      catch(ex) {
        setIsError(true);
      }
      
    }
    if (!isEmpty(id)) loadProduct();
  }, []) 

  if (isError) return (<div>Товара нет или произошла ошибка</div>);
  if (isEmpty(id)) return (<div>Укажите ID товара</div>);
  if (product == null) return (<div>Загрука товара</div>)

  return (
    <>
      <div className="main">
        <div className="main__container">
          <Header enableSearch={false}></Header>
          <h2>Карточка товара</h2>
          <div className="row">
            <MyProduct myproduct={product}>
              <a onClick={() => {navigate(`/`)}} class="btn btn-primary">Назад</a>
            </MyProduct>
            {isEmpty(product.reviews) ? (<>
            <div>Отзывов еще нет, но вы можете стать первым!</div>
            </>): (<><h2>Отзывы</h2>
              {product.reviews.map((comment) => {
                return (<Review comment={comment}></Review>)
              })}
            </>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage;