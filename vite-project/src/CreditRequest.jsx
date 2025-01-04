import React, { useState } from 'react';
import axios from 'axios';
import './CreditRequest.css';

function CreditRegistration() {
  // Estados para datos del usuario
  const [email, setEmail] = useState('');

  // Estados para datos del crédito
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [creditTypeId, setCreditTypeId] = useState('');
  const [files, setFiles] = useState(null); // Estado para manejar archivos
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const creditTypes = [
    { id: 1, name: 'Primera Vivienda' },
    { id: 2, name: 'Segunda Vivienda' },
    { id: 3, name: 'Renovación' },
    { id: 4, name: 'Otro' },
  ];

  const validateForm = () => {
    const errors = {};

    // Validaciones existentes
    if (!email) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El correo electrónico no es válido.';
    }

    if (!loanAmount || Number(loanAmount) <= 0) {
      errors.loanAmount = 'El monto del préstamo debe ser mayor a 0.';
    }

    if (!term || Number(term) <= 0) {
      errors.term = 'El plazo debe ser mayor a 0.';
    }

    if (!creditTypeId) {
      errors.creditTypeId = 'Debe seleccionar un tipo de crédito.';
    }

    if (!files || files.length === 0) {
      errors.files = 'Debe adjuntar al menos un archivo.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Manejar múltiples archivos si es necesario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    
    const creditRequest = {
      email: email,
      requestedAmount: loanAmount,
      termInYears: term,
      creditTypeId: creditTypeId,
      status: 'Pendiente', // o el estado que quieras
    };
  
    // Agregar el objeto creditRequest como un JSON al FormData
    formData.append('creditRequest', JSON.stringify(creditRequest));

    // Agregar archivos al FormData
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]); // 'files' es el nombre esperado en el backend
      }
    }

    try {
      const response = await axios.post('/api/credits/credit-request', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
  
      setMessage(response.data.message || 'Solicitud de crédito realizada con éxito.');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Hubo un error al realizar el registro.');
      } else {
        setMessage('Hubo un error al realizar el registro.');
      }
      console.error('Error al realizar el registro:', error);
    }
  };

  return (
    <div className="credit-request-container">
      <h2>Registro y Solicitud de Crédito</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos existentes */}
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="number"
            placeholder="Monto del préstamo"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
          {errors.loanAmount && <p className="error-message">{errors.loanAmount}</p>}
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
          {errors.term && <p className="error-message">{errors.term}</p>}
        </div>

        <div className="credit-request-group">
          <select
            className="credit-request-input"
            value={creditTypeId}
            onChange={(e) => setCreditTypeId(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo de crédito</option>
            {creditTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.creditTypeId && <p className="error-message">{errors.creditTypeId}</p>}
        </div>

        {/* Campo para subir archivos */}
        <div className="credit-request-group">
          <input
            className="credit-request-input"
            type="file"
            onChange={handleFileChange}
            multiple
            accept="application/pdf"
          />
          {errors.files && <p className="error-message">{errors.files}</p>}
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
