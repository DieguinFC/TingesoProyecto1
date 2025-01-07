import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EvaluationProcess.css'; // Opcional: estilos personalizados

function EvaluationProcess() {
  const { id } = useParams(); // Captura el requestId de la URL

  const [formData, setFormData] = useState({
    creditRequestId: parseInt(id, 10) || '', // Convertir id a número
    quotaIncomeRatio: '',
    maxAllowedQuotaIncomeRatio: '',
    creditHistoryStatus: '',
    creditHistoryComments: '',
    employmentYears: '',
    employmentType: '',
    debtIncomeRatio: '',
    maxAllowedDebtIncomeRatio: '',
    requestedAmount: '',
    propertyValue: '',
    maxfinancingPercentage: '',
    applicantAge: '',
    maxAgeAllowedAtLoanEnd: '',
    savingsBalance: '',
    minSavingsRequired: '',
    savingsConsistency: '',
    savingsComments: '',
    evaluationResult: 'Pendiente',
    evaluationComments: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const prepareFormData = () => {
    return {
      creditRequestId: formData.creditRequestId || '', // Usamos el valor convertido
      quotaIncomeRatio: formData.quotaIncomeRatio ? parseFloat(formData.quotaIncomeRatio) : 0,
      maxAllowedQuotaIncomeRatio: formData.maxAllowedQuotaIncomeRatio ? parseFloat(formData.maxAllowedQuotaIncomeRatio) : 0,
      creditHistoryStatus: formData.creditHistoryStatus || '',
      creditHistoryComments: formData.creditHistoryComments || '',
      employmentYears: formData.employmentYears ? parseInt(formData.employmentYears) : 0,
      employmentType: formData.employmentType || '',
      debtIncomeRatio: formData.debtIncomeRatio ? parseFloat(formData.debtIncomeRatio) : 0,
      maxAllowedDebtIncomeRatio: formData.maxAllowedDebtIncomeRatio ? parseFloat(formData.maxAllowedDebtIncomeRatio) : 0,
      requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : 0,
      propertyValue: formData.propertyValue ? parseFloat(formData.propertyValue) : 0,
      maxFinancingPercentage: formData.maxfinancingPercentage ? parseFloat(formData.maxfinancingPercentage) : 0,
      applicantAge: formData.applicantAge ? parseInt(formData.applicantAge) : 0,
      maxAgeAllowedAtLoanEnd: formData.maxAgeAllowedAtLoanEnd ? parseInt(formData.maxAgeAllowedAtLoanEnd) : 0,
      savingsBalance: formData.savingsBalance ? parseFloat(formData.savingsBalance) : 0,
      minSavingsRequired: formData.minSavingsRequired ? parseFloat(formData.minSavingsRequired) : 0,
      savingsConsistency: formData.savingsConsistency || '',
      savingsComments: formData.savingsComments || '',
      evaluationResult: formData.evaluationResult || 'Pendiente',
      evaluationComments: formData.evaluationComments || '',
    };
  };
  
  
  const handleSubmit = async () => {
    const dataToSend = prepareFormData();
    console.log("ID capturado desde la URL:", id);
    console.log("Datos a enviar:", dataToSend);
  
    try {
      const response = await fetch("/api/credit-evaluation/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const evaluation = await response.json();
        console.log("Evaluación exitosa:", evaluation);
        alert("Formulario enviado y evaluación completada con éxito.");
        window.history.back(); // Volver a la página anterior
      } else {
        const errorMessage = await response.text();
        console.error("Error en la evaluación:", errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Ocurrió un error inesperado al enviar la solicitud.");
    }
  };

  
  const handleCancel = () => {
    const userConfirmed = window.confirm("¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.");
    if (userConfirmed) {
      console.log("Evaluación cancelada.");
      window.history.back(); // Redirigir a la página anterior
    } else {
      console.log("Cancelación abortada por el usuario.");
    }
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
              name="quotaIncomeRatio"
              value={formData.quotaIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.3"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Relacion maxima cuota/ingreso:
            <input
              type="number"
              name="maxAllowedQuotaIncomeRatio"
              value={formData.maxAllowedQuotaIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.5"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Estado de Historial crediticio:
            <select
              name="creditHistoryStatus"
              value={formData.creditHistoryStatus}
              onChange={handleChange}
              required
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
            Detalles del Historial crediticio:
            <textarea
              type="text"
              name="creditHistoryComments"
              value={formData.creditHistoryComments}
              onChange={handleChange}
              placeholder="Detalle del historial crediticio"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Años de antiguedad en empleo actual:
            <input
              type="number"
              name="employmentYears"
              value={formData.employmentYears}
              onChange={handleChange}
              placeholder="Ejemplo: 2"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tipo de empleo:
            <select
              type="text"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              placeholder="Ejemplo: Fijo, temporal, independiente"
              required
              >
              <option value="">Elija una opción</option>
              <option value="Fijo">Fijo</option>
              <option value="Temporal">Temporal</option>
              <option value="Independiente">Independiente</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Relación deuda/ingreso:
            <input
              type="number"
              name="debtIncomeRatio"
              value={formData.debtIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.5"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Relación deuda/ingreso Maxima permitida:
            <input
              type="number"
              name="maxAllowedDebtIncomeRatio"
              value={formData.maxAllowedDebtIncomeRatio}
              onChange={handleChange}
              placeholder="Ejemplo: 0.6"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Monto solicitado por el cliente:
            <input
              type="number"
              name="requestedAmount"
              value={formData.requestedAmount}
              onChange={handleChange}
              placeholder="Ejemplo: $10000000"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Costo de la propiedad:
            <input
              type="number"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleChange}
              placeholder="Ejemplo: $1000000000"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Maximo porcentaje de financiamiento:
            <input
              type="number"
              name="maxfinancingPercentage"
              value={formData.maxfinancingPercentage}
              onChange={handleChange}
              placeholder="Ejemplo: 0.8"
              required
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
              placeholder="Ejemplo: 30"
              required
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
              placeholder="Ejemplo: 75"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Saldo actual de ahorros:
            <input
              type="number"
              name="savingsBalance"
              value={formData.savingsBalance}
              onChange={handleChange}
              placeholder="Ejemplo: $10000000"
              required
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
              placeholder="Ejemplo: $8000000"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Consistencia de ahorros:
            <select
              type="text"
              name="savingsConsistency"
              value={formData.savingsConsistency}
              onChange={handleChange}
              placeholder="Ejemplo: Consistente, intermitente, irregular"
              required
              >
              <option value="">Elija una opción</option>
              <option value="Consistente">Consistente</option>
              <option value="Intermitente">Intermitente</option>
              <option value="Irregular">Irregular</option>
            </select>
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
              required
            />
          </label>
        </div>

        {/* Estado y comentarios */}
        <div className="form-group">
          <label>
            Estado:
            <select
              name="evaluationResult"
              value={formData.evaluationResult}
              onChange={handleChange}
              required
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
              name="evaluationComments"
              value={formData.evaluationComments}
              onChange={handleChange}
              placeholder="Escribe comentarios adicionales..."
              required
            />
          </label>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="submit-button"
          >
            Guardar
          </button>

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
