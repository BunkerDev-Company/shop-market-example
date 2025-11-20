import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './routes/Main';
import { UserProvider } from './contexts/UserContext';
import AccountPage from './routes/Account';
import ProductPage from './routes/Product';

const AppRouter = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default AppRouter;