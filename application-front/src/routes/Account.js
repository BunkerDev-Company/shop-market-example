import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AccountPage = () => {
  const { user, isLoading, balance, changeParameter } = useUser();
  const navigate = useNavigate();
  const params = useParams();

  if (isLoading) return (
    <>
      <h1>Загрузка пользователя</h1>
    </>
  )

  return (
    <>
      <div className="row">
        <div className="col col-12" style={{padding: "48px", paddingBottom: "8px"}}>
          <h1>Пользователь</h1>
        </div>
        <div className="col col-12" style={{padding: "48px"}}>
          <div class="mb-3">
            <label class="form-label">Баланс</label>: <span>{balance} ₽</span>
          </div>
          <div class="mb-3">
            <label for="fioId" class="form-label">ФИО</label>
            <input value={user.name} onChange={(e) => { changeParameter("name", e.target.value) }} class="form-control" id="fioId" placeholder="Иван Иванов..." />
          </div>
          <div class="mb-3">
            <label for="emailID" class="form-label">Почта</label>
            <input type="email" value={user.email} onChange={(e) => { changeParameter("email", e.target.value) }} class="form-control" id="emailID" placeholder="name@example.com..." />
          </div>
          <div class="mb-3">
            <label for="descriptionId" class="form-label">Описание</label>
            <textarea class="form-control" onChange={(e) => { changeParameter("description", e.target.value) }} value={user.description} id="descriptionId" rows="3"></textarea>
          </div>
        </div>
      </div>
      <div className="row" style={{padding: "48px", paddingBottom: "8px"}}>
        <div className="col col-12">
          <a onClick={() => { navigate("/") }} className="btn btn-primary">Вернутся назад</a>
        </div>
      </div>
    </>
  )
}

export default AccountPage;
