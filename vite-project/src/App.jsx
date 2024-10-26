import { useState } from 'react';
import './App.css';
import './CreditSimultation.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function HomePage() {
  return (
    <div>
      <header>
        <h1>BankChat</h1> {/* Título de la página */}
      </header>
      <div className="card">
        <p>Bancan chat?</p> {/* Mensaje de bienvenida */}
        {/* Botón que no hace nada */}
        <button>Simulación de Crédito</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
