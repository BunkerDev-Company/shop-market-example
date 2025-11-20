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
    setUser({...user, [typeParam]: valueParam });
  };

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Михаил",
        email: "123@yandex.ru",
        description: "Я программист",
        age: "15",
        id: 1
      });
      setBalance(3000);
      setIsLoading(false);
    }, 100)
  },[]) 

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      changeBalance, 
      balance,
      changeParameter
    }}>
      {children}
    </UserContext.Provider>
  );
};