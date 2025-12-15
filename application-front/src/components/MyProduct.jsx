import React, { use, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../utils/isEmpty";
import { useCart } from "../contexts/CartContext";


const MyProduct = ({ children, myproduct, _class }) => {
  const { addProduct } = useCart();
  const { changeBalance, balance } = useUser();
  const [isBuy, setIsBuy] = useState(false);

  const buy = (price, id) => {
    //if (balance < price) return;
    addProduct(id);
    setIsBuy(true);
    const result = balance - price;
    changeBalance(result);
  };

  return (
    <div className={`col col-12 mb-3 ${_class}`}>
      <div class="card">
        <img src="/images/krossovki.png" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{myproduct.name} ({myproduct.brand})</h5>
          <p class="card-text">Цена: {myproduct.price}р</p>
          {isEmpty(myproduct.description) ? (<></>) : (<p class="card-text">{myproduct.description}</p>)}
          <a onClick={() => {buy(myproduct.price, myproduct.id)}} class="btn btn-primary mb-1">{isBuy ? "Куплено" : "Купить"}</a>
          <br />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;