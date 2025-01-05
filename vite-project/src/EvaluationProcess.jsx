import React, { useState } from 'react';
import './EvaluationProcess.css'; // Opcional: estilos personalizados

function EvaluationProcess() {
  const [formData, setFormData] = useState({
    QuotaIncomeRatio: '',
    CreditHistory: '',
    EmploymentStability: '',
    DebtIncomeRatio: '',
    SavingsRequirements: '',
    status: 'Pendiente',
    comments: '',
    employmentYears: '',
    employmentType: '',
    applicantAge: '',
    maxAgeAllowedAtLoanEnd: '',
    savingsBalance: '',
    minSavingsRequired: '',
    savingsConsistency: '',
    savingsComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes enviar los datos al backend con axios u otro método
  };

  const handleCancel = () => {
    console.log('Evaluación cancelada.');
    // Redirigir o limpiar formulario si es necesario
  };

  return (
    <div className="evaluation-process-container">
      <h2>Evaluación de Crédito</h2>
      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-group">
          <label>
            Relación cuota/ingreso:
            <input
              type="number"
              name="QuotaIncomeRatio"
              value={formData.QuotaIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.3"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Estado de Historial crediticio:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Seleccionar estado</option>
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Historial crediticio:
            <textarea
              type="text"
              name="hasGoodCreditHistory"
              value={formData.CreditHistory}
              onChange={handleChange}
              placeholder="Detalle del historial crediticio"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Años de antiguedad en empleo actual:
            <input
              type="number"
              name="meetsEmploymentStability"
              value={formData.EmploymentStability}
              onChange={handleChange}
              placeholder="Ejemplo: 2"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tipo de empleo:
            <input
              type="text"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              placeholder="Ejemplo: Fijo, temporal, independiente"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Relación deuda/ingreso:
            <input
              type="number"
              name="meetsDebtIncomeRatio"
              value={formData.DebtIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.5"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monto solicitado por el cliente:
            <input
              type="text"
              name="meetsSavingsRequirements"
              value={formData.SavingsRequirements}
              onChange={handleChange}
              placeholder="Ejemplo: $100000"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Edad del solicitante:
            <input
              type="number"
              name="applicantAge"
              value={formData.applicantAge}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Edad máxima al finalizar el préstamo:
            <input
              type="number"
              name="maxAgeAllowedAtLoanEnd"
              value={formData.maxAgeAllowedAtLoanEnd}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Saldo de ahorros:
            <input
              type="number"
              name="savingsBalance"
              value={formData.savingsBalance}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monto mínimo de ahorros requerido:
            <input
              type="number"
              name="minSavingsRequired"
              value={formData.minSavingsRequired}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Consistencia de ahorros:
            <input
              type="text"
              name="savingsConsistency"
              value={formData.savingsConsistency}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Comentarios sobre los ahorros:
            <textarea
              name="savingsComments"
              value={formData.savingsComments}
              onChange={handleChange}
              placeholder="Escribe comentarios sobre los ahorros..."
            />
          </label>
        </div>

        {/* Estado y comentarios */}
        <div className="form-group">
          <label>
            Estado:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Comentarios adicionales:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Escribe comentarios adicionales..."
            />
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">Guardar</button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EvaluationProcess;
