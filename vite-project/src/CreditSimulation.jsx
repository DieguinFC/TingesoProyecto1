import React, { useState } from 'react';
import axios from 'axios';
import './CreditSimulation.css';

function CreditSimulation() {
  // Estados para almacenar los datos del formulario
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null); // Estado para almacenar el resultado

  const handleSimulate = async (e) => {
    e.preventDefault();

    try {
      // Envía la solicitud al backend con los datos de simulación
      const response = await axios.post('http://localhost:8080/api/creditsimulation/simulate', {
        loanAmount: parseFloat(loanAmount),
        annualInterestRate: parseFloat(annualInterestRate),
        term: parseInt(term, 10)
      });

      // Almacena el resultado en el estado
      setMonthlyPayment(response.data);
    } catch (error) {
      console.error('Error al realizar la simulación:', error);
    }
  };

  return (
    <div className="credit-simulation-container">
      <h2 className="credit-simulation-title">Simulación de Crédito Hipotecario</h2>
      <form onSubmit={handleSimulate}>
        <input
          type="number"
          className="credit-simulation-input"
          placeholder='Monto del Préstamo'
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          className="credit-simulation-input"
          placeholder='Tasa de Interés Anual (%)'
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(e.target.value)}
          required
        />
        <input
          type="number"
          className="credit-simulation-input"
          placeholder='Plazo en años'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />

        <button type="submit" className="credit-simulation-button">Calcular Cuota Mensual</button>
      </form>

      {/* Mostrar el resultado si está disponible */}
      {monthlyPayment !== null && (
        <div className="simulation-result">
          <h3>Resultado de la Simulación</h3>
          <p>Cuota Mensual: ${monthlyPayment.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default CreditSimulation;
