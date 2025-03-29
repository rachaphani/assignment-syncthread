// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setAuth(localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <LoginPage setAuth={setAuth} />} />
        <Route path="/dashboard" element={auth ? <Dashboard auth={auth} /> : <Navigate to="/" />} />
        <Route path="/map" element={auth ? <MapView auth={auth} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;