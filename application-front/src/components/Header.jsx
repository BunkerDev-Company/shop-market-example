import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { toUsd } from "../utils/Converts";
import { useLaunchParams } from '@telegram-apps/sdk-react';

const Header = ({ children, enableSearch, searchMethod }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { user, isLoading, balance } = useUser();
  
  const launchParams = useLaunchParams();
  const _user = launchParams?.initData?.user;
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div className="row">
          {enableSearch ? 
          (<div className="col col-12 d-flex mb-2">
            <input class="form-control me-2" onChange={(e) => {searchMethod(e.target.value)} } type="text" placeholder="Search" aria-label="Search"/>
          </div>) : (<></>)}
          <div className="col col-12">
            <a class="navbar-brand" onClick={() => {navigate("/account")}}>
              {isLoading ? "Загрузка": (<p className="my-style">{_user.firstName} {_user.lastName}, баланс: {balance}р, {_user.username}</p>)}
            </a>
          </div>
        </div>
      </div>
      {children}
    </nav>
  );
};

export default Header;
