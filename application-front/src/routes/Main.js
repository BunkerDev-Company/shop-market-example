import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { toUsd } from "../utils/Converts";
import { useNavigate, useParams } from "react-router-dom";
import "./Main.scss";
import MyProduct from "../components/MyProduct";
import { useUser } from "../contexts/UserContext";
import { isEmpty } from "../utils/isEmpty";
import axios from "axios";
import Header from "../components/Header";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const _products = await axios.get("https://localhost:7128/api/Product/All");

      setProducts(_products.data);
    }
    loadProducts();
    setIsLoad(false);
  }, []) 

  const search = (param) => {
    if (isEmpty(param)) {
      setFilterProducts(products);
    }
    else {
      const _products = products.filter((fp) => fp.name.includes(param));
      setFilterProducts(_products);
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  if (isLoad) return <div style={{height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}><div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>;

  return (
    <>
      <div className="main">
        <div className="main__container">
          <Header enableSearch={true} searchMethod={search}></Header>
          <div className="row">
            {filterProducts.map((myproduct) => (
              <MyProduct myproduct={myproduct} _class={myproduct.class}>
                <a onClick={() => {navigate(`/product/${myproduct.id}`)}} class="btn btn-primary">Открыть товар</a>
              </MyProduct>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
