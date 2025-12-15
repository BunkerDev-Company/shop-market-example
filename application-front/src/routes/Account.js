import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useBackButtonManager } from '../contexts/BackButtonContext';
import { miniApp } from '@telegram-apps/sdk-react';

const AccountPage = () => {
  const { user, isLoading, balance, changeParameter, loadUser } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const { action, clear } = useBackButtonManager();

  const [username, setUsername] = useState("");
  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    miniApp.setBackgroundColor('#1D1D20');
    miniApp.setHeaderColor('#1D1D20');
    action(() => navigate("/"));
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setUsername(user.username);
    setFio(user.fio);
    setEmail(user.email);
    setPhone(user.phone);
  }, [isLoading])

  const saveUser = () => {
    const saveUser = async () => {
      const request = {
        id: user.id,
        username: username,
        fio: fio,
        email: email,
        phone: phone
      }

      await axios.post("https://localhost:7128/api/User/UpdateUser", request);

      loadUser();
    }
    saveUser();
  }

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
            <label for="usernameId" class="form-label">Username</label>
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} class="form-control" id="usernameId" placeholder="admin" />
          </div>
          <div class="mb-3">
            <label for="fioId" class="form-label">ФИО</label>
            <input value={fio} onChange={(e) => { setFio(e.target.value) }} class="form-control" id="fioId" placeholder="Иван Иванов..." />
          </div>
          <div class="mb-3">
            <label for="emailID" class="form-label">Почта</label>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} class="form-control" id="emailID" placeholder="name@example.com..." />
          </div>
          <div class="mb-3">
            <label for="phoneUser" class="form-label">Телефон</label>
            <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} class="form-control" id="phoneUser" placeholder="+75456546" />
          </div>
        </div>
      </div>
      
      <div className="row" style={{padding: "48px", paddingBottom: "8px"}}>
        <div className="col col-12 mb-3">
          <button onClick={saveUser} className="btn btn-primary">Сохранить</button>
        </div>
        <div className="col col-12">
          <a onClick={() => { navigate("/") }} className="btn btn-primary">Вернутся назад</a>
        </div>
      </div>
    </>
  )
}

export default AccountPage;
