import React, { useState } from 'react';
import axios from 'axios';
import './CreditSimulation.css';

function CreditSimulation() {
  // Estados para almacenar los datos del formulario
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [email, setEmail] = useState(''); // Nuevo estado para el correo electrónico
  const [monthlyPayment, setMonthlyPayment] = useState(null); // Estado para almacenar el resultado
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error

  const formatNumber = (number) => {
    return number.toLocaleString('es-ES');
  };

  const handleSimulate = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensaje de error antes de una nueva solicitud

    try {
      // Envía la solicitud al backend con los datos de simulación
      const response = await axios.post('/api/creditsimulation/simulate', {
        loanAmount: parseFloat(loanAmount.replace(/\./g, '')),
        annualInterestRate: parseFloat(annualInterestRate),
        term: parseInt(term, 10),
        email // Incluir el correo electrónico en la solicitud
      });

      // Almacena el resultado en el estado
      setMonthlyPayment(response.data);
    } catch (error) {
      // Maneja el error aquí
      if (error.response && error.response.status === 400) {
        // Si el error es 400, significa que el correo no existe
        setErrorMessage(error.response.data); // Establecer mensaje de error del backend
      } else {
        console.error('Error al realizar la simulación:', error);
        setErrorMessage('Hubo un error al realizar la simulación.'); // Mensaje genérico
      }
    }
  };

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    setLoanAmount(value ? formatNumber(Number(value)) : '');
  };

  const handleBack = () => {
    // Lógica para volver a la página anterior
    window.history.back();
  };

  return (
    <div className="credit-simulation-wrapper">
      <div className="credit-simulation-container">
        <h2 className="credit-simulation-title">Simulación de Crédito Hipotecario</h2>
        <form onSubmit={handleSimulate}>
          <input
            type="email" // Cambiar tipo a "email"
            className="credit-simulation-input"
            placeholder='Correo Electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="credit-simulation-input"
            placeholder='Monto del Préstamo'
            value={loanAmount}
            onChange={handleLoanAmountChange}
            required
          />
          <input
            type="number"
            step="0.01"
            className="credit-simulation-input"
            placeholder='Tasa de Interés Anual (%) Ejemplo: 4,5'
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
            <h3>Cuota Mensual Simulada:</h3>
            <p>${formatNumber(monthlyPayment.toFixed(2))}</p>
          </div>
        )}

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
      {/* Botón para volver */}
      <button onClick={handleBack} className="simulation-back-button">Volver</button>
    </div>
  );
}

export default CreditSimulation;