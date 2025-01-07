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
  const [infoContent, setInfoContent] = useState('Seleccione un tipo de crédito para ver más información.');

  const creditTypes = [
    { id: 1, name: 'Primera Vivienda', info: `
Primera Vivienda.
Plazo máximo: 30 años
Tasa de interés anual: 3,5% - 5%
Monto financiamento máximo: 
80% el valor de la propiedad
Requisitos Documentales:
- Comprobante de ingresos
- Certificado de avalúo
- Historial crediticio
    ` },
    { id: 2, name: 'Segunda Vivienda', info: `
Segunda Vivienda.
Plazo máximo: 20 años
Tasa de interés anual: 4% - 6%
Monto financiamento máximo: 
70% el valor de la propiedad
Requisitos Documentales:
- Comprobante de ingresos
- Certificado de avalúo
- Escritura de la primera vivienda
- Historial crediticio
    ` },
    { id: 3, name: 'Renovación', info: `
Renovación.
Plazo máximo: 25 años
Tasa de interés anual: 5% - 7%
Monto financiamento máximo: 
60% el valor de la propiedad
Requisitos Documentales:
- Estado financiero del negocio
- Comprobante de ingresos
- Certificado de avalúo
- Plan de negocios
    ` },
    { id: 4, name: 'Otro', info: `
Otros.
Plazo máximo: 15 años
Tasa de interés anual: 4.5% - 6%
Monto financiamento máximo: 
50% el valor de la propiedad
Requisitos Documentales:
- Comprobante de ingresos
- Presupuesto de la remodelación
- Certificado de avalúo actualizado
    ` },
  ];

  const formatNumber = (number) => {
    return number.toLocaleString('es-ES');
  };

  const validateForm = () => {
    const errors = {};

    // Validaciones existentes
    if (!email) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El correo electrónico no es válido.';
    }

    if (!loanAmount || Number(loanAmount.replace(/\./g, '')) <= 0) {
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

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    setLoanAmount(value ? formatNumber(Number(value)) : '');
  };

  const handleCreditTypeChange = (e) => {
    const selectedCreditTypeId = e.target.value;
    setCreditTypeId(selectedCreditTypeId);

    const selectedCreditType = creditTypes.find(type => type.id === parseInt(selectedCreditTypeId));
    setInfoContent(selectedCreditType ? selectedCreditType.info : 'Seleccione un tipo de crédito para ver más información.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    
    const creditRequest = {
      email: email,
      requestedAmount: parseFloat(loanAmount.replace(/\./g, '')),
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

  const handleBack = () => {
    // Lógica para volver a la página anterior
    window.history.back();
  };

  return (
    <div className="credit-request-wrapper">
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
              type="text"
              placeholder="Monto del préstamo"
              value={loanAmount}
              onChange={handleLoanAmountChange}
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
              onChange={handleCreditTypeChange}
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
      <div className="credit-request-info">
        <h3>Información sobre los tipos de credito</h3>
        <p>{infoContent}</p>
      </div>
      <div className="back-button-container">
        <button onClick={handleBack} className="credit-register-back-button">Volver</button>
      </div>
    </div>
  );
}

export default CreditRegistration;