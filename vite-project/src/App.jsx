import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import CreditSimulation from './CreditSimulation.jsx';
import Register from './Register.jsx'; // Importa el componente Register

function HomePage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); // Permite navegar a rutas dinámicas
  };

  return (
    <div className="card">
      <p>Bancan chat?</p>
      <button onClick={() => handleClick('/simulate')}>Simulación de Crédito</button>
      <button className="button2" onClick={() => handleClick('/register')}>
        Registrarse
      </button> {/* Botón de registro */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <header>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '2em', color: 'inherit' }}>
          BankChat
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulate" element={<CreditSimulation />} />
        <Route path="/register" element={<Register />} />  Ruta de registro 
      </Routes>
    </Router>
  );
}

export default App;
