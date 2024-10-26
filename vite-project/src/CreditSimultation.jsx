import React, { useState } from 'react';
import axios from 'axios';

function CreditSimulation() {
  // Estados para almacenar los datos del formulario
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // Función para manejar el envío del formulario
  const handleSimulate = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud al backend
      const response = await axios.post('http://localhost:5173/api/creditsimulation', {
        loanAmount: parseFloat(loanAmount),
        annualInterestRate: parseFloat(annualInterestRate),
        term: parseInt(term, 10)
      });

      // Guarda el resultado de la simulación en el estado
      setMonthlyPayment(response.data);
    } catch (error) {
      console.error('Error en la simulación:', error);
    }
  };

  return (
    <div>
      <h2>Simulación de Crédito Hipotecario</h2>
      <form onSubmit={handleSimulate}>
        <div>
          <label>Monto del Préstamo:</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tasa de Interés Anual (%):</label>
          <input
            type="number"
            step="0.01"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Plazo (años):</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calcular Cuota Mensual</button>
      </form>

      {monthlyPayment !== null && (
        <div>
          <h3>Resultado de la Simulación</h3>
          <p>Cuota Mensual: ${monthlyPayment.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default CreditSimulation;
