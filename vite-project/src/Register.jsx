import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [income, setIncome] = useState('');
  const [message, setMessage] = useState('');

  const formatNumber = (number) => {
    return number.toLocaleString('es-ES');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        income: parseFloat(income.replace(/\./g, '')), // Elimina los puntos antes de enviar
      });
      setMessage("Registro exitoso. ¡Bienvenido!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data); // Muestra el mensaje de error del backend
      } else {
        setMessage("Error al registrar el usuario");
      }
    }
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    setIncome(value ? formatNumber(Number(value)) : '');
  };

  const handleBack = () => {
    // Lógica para volver a la página anterior
    window.history.back();
  };

  return (
    <div>
      <div className="register-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
          <input
            className='register-input'
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className='register-input'
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className='register-input'
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input className='register-input'
            type="text"
            placeholder="Ingreso Mensual"
            value={income}
            onChange={handleIncomeChange}
            required
          />
          <button className='register-button' type="submit">Registrarse</button>
        </form>
        {message && <p className='register-text'>{message}</p>}
      </div>
      <button onClick={handleBack} className="register-back-button">Volver</button>
    </div>
  );
}

export default Register;