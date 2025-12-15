import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './routes/Main';
import { UserProvider } from './contexts/UserContext';
import AccountPage from './routes/Account';
import ProductPage from './routes/Product';
import { BackButtonProvider } from './contexts/BackButtonContext';
import { CartProvider } from './contexts/CartContext';
import CartPage from './routes/Cart';
import OrderPage from './routes/Order';
import SuccessPage from './routes/Success';

const AppRouter = () => {
  return (
    <Router>
      <UserProvider>
        <BackButtonProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </CartProvider>
        </BackButtonProvider>
      </UserProvider>
    </Router>
  );
};

export default AppRouter;