import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { toUsd } from "../utils/Converts";

const Header = ({ children, enableSearch, searchMethod }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { user, isLoading, balance } = useUser();
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
              {isLoading ? "Загрузка": (<p className="my-style">{user.name}, баланс: {balance}р, доллары: {toUsd(balance)}$</p>)}
            </a>
          </div>
        </div>
      </div>
      {children}
    </nav>
  );
};

export default Header;
