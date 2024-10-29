import React, { useState } from 'react';
import './App.css';
import './CreditSimultation.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';



function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirige a la ruta "/simulate"
    navigate('/simulate');
  };

  return (
    <div className="card">
      <p>Bancan chat?</p> {/* Mensaje de bienvenida */}
      <button onClick={handleClick}>Simulación de Crédito</button>
    </div>
  );
}

function CreditSimulation() {
  return (
    <div>
      <h2>Bienvenido a la Simulación de Crédito</h2>
      <p>Esta es la página de simulación de crédito.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Cabezera permanente */}
      <header>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '2em', color: 'inherit' }}>
          BankChat
        </Link>
      </header>

      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={<HomePage />} />

        {/* Ruta para la simulación de crédito */}
        <Route path="/simulate" element={<CreditSimulation />} />
      </Routes>
    </Router>
  );
}

export default App;
