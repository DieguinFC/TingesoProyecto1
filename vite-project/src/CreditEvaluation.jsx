import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreditEvaluation.css';
import './EvaluationProcess.jsx';

function CreditEvaluation() {
  const [creditRequests, setCreditRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define los tipos de crédito
  const creditTypes = [
    { id: 1, name: 'Primera Vivienda' },
    { id: 2, name: 'Segunda Vivienda' },
    { id: 3, name: 'Renovación' },
    { id: 4, name: 'Otro' }
  ];

  useEffect(() => {
    const fetchCreditRequests = async () => {
      try {
        const response = await axios.get('/api/credits/credit-requests');
        setCreditRequests(response.data);
      } catch (err) {
        setError('Error al cargar las solicitudes de crédito.');
        console.error(err);
      }
    };

    fetchCreditRequests();
  }, []);

  const handleEvaluate = (requestId) => {
    navigate(`/credit-evaluation/evaluation/${requestId}`);
  };

  return (
    <div className="credit-requests-container">
      <h2>Solicitudes de Crédito</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && creditRequests.length === 0 && (
        <p>No hay solicitudes de crédito disponibles.</p>
      )}
      {creditRequests.length > 0 && (
        <table className="credit-requests-table">
          <thead>
            <tr>
              <th>Correo Electrónico</th>
              <th>Monto Solicitado</th>
              <th>Plazo (años)</th>
              <th>Tipo de Crédito</th>
              <th>Estado</th>
              <th>Evaluar</th>
            </tr>
          </thead>
          <tbody>
            {creditRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.email}</td>
                <td>{request.requestedAmount}</td>
                <td>{request.termInYears}</td>
                <td>
                  {
                    creditTypes.find((type) => type.id === request.creditTypeId)?.name || 'Desconocido'
                  }
                </td>
                <td>{request.status}</td>
                <td>
                  {request.status !== 'Aceptada' && request.status !== 'Rechazada' && (
                    <button
                      className="evaluate-button"
                      onClick={() => handleEvaluate(request.id)}
                    >
                      Evaluar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CreditEvaluation;
