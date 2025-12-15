import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isEmpty } from "../utils/isEmpty";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const addLocalStorage = (id) => {
    const cartProducts = getAndCreateStorage();

    cartProducts.push({id: id, count: 1});

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const addProduct = (id) => {
    var cartProducts = getAndCreateStorage();
    if (cartProducts.find(product => product.id == id)) {
      updateProduct(cartProducts.find(product => product.id == id).id, cartProducts.find(product => product.id == id).count)
    }
    else {
      addLocalStorage(id);
    }
  }

  const getAndCreateStorage = () => {
    var cartProducts = localStorage.getItem("cartProducts");
    if (isEmpty(cartProducts)) {
      cartProducts = [];
      localStorage.setItem("cartProducts", JSON.stringify([]));
      return cartProducts;
    }
    return JSON.parse(cartProducts);
  }

  const updateProduct = (id, count) => {
    const cartProducts = getAndCreateStorage();

    const foundIndex = cartProducts.findIndex(product => product.id == id);
    cartProducts[foundIndex].count = count + 1;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const getAllProducts = () => {
    const cartProducts = getAndCreateStorage();

    return cartProducts;
  }

  const getCountById = (id) => {
    const cartProducts = getAndCreateStorage();

    if (cartProducts.find(product => product.id == id)) {
      return cartProducts.find(product => product.id == id).count
    }
    else {
      return null;
    }
  }

  const deleteProduct = (id) => {
    const cartProducts = getAndCreateStorage();

    const foundIndex = cartProducts.findIndex(product => product.id == id);
    if (foundIndex == undefined) return;

    cartProducts.splice(foundIndex, 1);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const addCount = (id) => {
    const cartProducts = getAndCreateStorage();

    const foundIndex = cartProducts.findIndex(product => product.id == id);
    if (foundIndex == undefined) return;
    cartProducts[foundIndex].count = cartProducts[foundIndex].count + 1;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const reduceCount = (id) => {
    const cartProducts = getAndCreateStorage();

    const foundIndex = cartProducts.findIndex(product => product.id == id);
    if (foundIndex == undefined) return;
    if (cartProducts[foundIndex].count == 1) {
      return deleteProduct(id);
    }
    cartProducts[foundIndex].count = cartProducts[foundIndex].count - 1;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const clearAll = () => {
    localStorage.setItem("cartProducts", JSON.stringify([]));
  }

  return (
    <CartContext.Provider value={{ 
      addProduct,
      getAllProducts,
      getCountById,
      deleteProduct,
      addCount,
      reduceCount,
      clearAll
      }}>
      {children}
    </CartContext.Provider>
  );
};