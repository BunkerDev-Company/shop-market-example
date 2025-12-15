import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const changeBalance = (newBalance) => {
    setBalance(newBalance);
  }
  
  const changeParameter = (typeParam, valueParam) => {
    //setUser({...user, [typeParam]: valueParam });
  };
  const loadUser = async () => {
        const user = await axios.get("https://localhost:7128/api/User/Me");
        setUser(user.data);
        setBalance(user.data.score);
        setIsLoading(false);
      }
  useEffect(() => {
      loadUser();
  },[]) 

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      changeBalance, 
      balance,
      changeParameter,
      loadUser
    }}>
      {children}
    </UserContext.Provider>
  );
};