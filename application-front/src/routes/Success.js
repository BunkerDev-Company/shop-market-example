import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useBackButtonManager } from '../contexts/BackButtonContext';
import { miniApp } from '@telegram-apps/sdk-react';

const SuccessPage = () => {
  const { user, isLoading, balance, changeParameter, loadUser } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const { action, clear } = useBackButtonManager();

  useEffect(() => {
      window.scrollTo(0, 0);
      miniApp.setBackgroundColor('#1D1D20');
      miniApp.setHeaderColor('#1D1D20');
      clear();
    }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "80vh" }}>
      <div className="card bg-dark text-white p-4 border-0" style={{ maxWidth: "420px", width: "100%" }}>
        
        <div className="mb-4">
          <div className="rounded-circle bg-success d-flex justify-content-center align-items-center mx-auto" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-check-lg fs-1 text-white"></i>
          </div>
        </div>

        <h2 className="mb-3 fw-bold">Заказ оформлен</h2>

        <p className="text-secondary mb-4">
          Благодарим за оформление!  
          Мы уже начали готовить ваш заказ.  
        </p>

        <button
          className="btn btn-outline-light w-100 py-2"
          onClick={() => navigate("/")}
        >
          На главную
        </button>

      </div>

    </div>
  )
}

export default SuccessPage;
