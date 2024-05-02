import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/Header';
import Login from './pages/login/Login';
import Register from './pages/signup/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;