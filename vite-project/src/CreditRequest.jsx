import React, { useState } from 'react';
import axios from 'axios';
import './CreditRequest.css';

function CreditRegistration() {
  // Estados para datos del usuario
  const [email, setEmail] = useState('');
  const [income, setIncome] = useState('');

  // Estados para datos del crédito
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [creditTypeId, setCreditTypeId] = useState(''); // Cambiado a creditTypeId
  const [message, setMessage] = useState('');

  // Obtener los tipos de crédito al cargar el componente
  const creditTypes = [
    { id: 1, name: 'Primera Vivienda' },
    { id: 2, name: 'Segunda Vivienda' },
    { id: 3, name: 'Renovación' },
    { id: 4, name: 'Otro' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud de crédito
      await axios.post('/api/credit-request', {
        requestedAmount: loanAmount,
        termInYears: term,
        creditType: { id: creditTypeId }, // Enviar solo el ID del tipo de crédito
        email,
        income
      });

      setMessage('Registro y solicitud de crédito realizados con éxito.');
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage('Hubo un error al realizar el registro.');
    }
  };

  return (
    <div className="credit-request-container">
      <h2>Registro y Solicitud de Crédito</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="number"
            placeholder="Ingreso mensual"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
  
        {/* Datos del Crédito */}
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="number"
            placeholder="Monto del préstamo"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
  
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="number"
            placeholder="Plazo en años"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
  
        <div className="credit-request-group">
          <select
            className="credit-request-input"
            value={creditTypeId} // Cambiar a creditTypeId
            onChange={(e) => setCreditTypeId(e.target.value)} // Cambiar a setCreditTypeId
            required
          >
            <option value="">Seleccione un tipo de crédito</option>
            {creditTypes.map((type) => (
              <option key={type.id} value={type.id}> {/* Cambiar a type.id */}
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <button className="credit-registration-button" type="submit">
          Registrar y Solicitar Crédito
        </button>
      </form>
      {message && <p className="credit-registration-message">{message}</p>}
    </div>
  );
}

export default CreditRegistration;
