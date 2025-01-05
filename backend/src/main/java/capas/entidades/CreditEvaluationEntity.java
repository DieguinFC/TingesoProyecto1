package capas.entidades;

import capas.entidades.CreditRequestEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "credit_evaluations")
public class CreditEvaluationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "credit_request_id", nullable = false)
    private CreditRequestEntity creditRequest; // Referencia a la solicitud de crédito asociada.

    // R1: Relación cuota/ingreso
    @Column(nullable = false)
    private double quotaIncomeRatio; // Relación cuota/ingreso como porcentaje.

    @Column(nullable = false)
    private double maxAllowedQuotaIncomeRatio; // Umbral máximo permitido para cuota/ingreso.

    // R2: Historial crediticio
    @Column(nullable = false)
    private String creditHistoryStatus; // Estado del historial crediticio (e.g., "Bueno", "Malo", "Regular").

    @Column
    private String creditHistoryComments; // Comentarios sobre el historial crediticio.

    // R3: Estabilidad laboral
    @Column(nullable = false)
    private int employmentYears; // Años de antigüedad en el empleo actual.

    @Column
    private String employmentType; // Tipo de empleo (e.g., "Dependiente", "Independiente").

    // R4: Relación deuda/ingreso
    @Column(nullable = false)
    private double debtIncomeRatio; // Relación deuda/ingreso como porcentaje.

    @Column(nullable = false)
    private double maxAllowedDebtIncomeRatio; // Umbral máximo permitido para deuda/ingreso.

    // R5: Monto máximo de financiamiento
    @Column(nullable = false)
    private double requestedAmount; // Monto solicitado por el cliente.

    @Column(nullable = false)
    private double propertyValue; // Valor de la propiedad.

    @Column(nullable = false)
    private double maxFinancingPercentage; // Porcentaje máximo financiable según las reglas.

    // R6: Edad del solicitante
    @Column(nullable = false)
    private int applicantAge; // Edad del solicitante.

    @Column(nullable = false)
    private int maxAgeAllowedAtLoanEnd; // Edad máxima permitida al finalizar el préstamo.

    // R7: Capacidad de ahorro
    @Column(nullable = false)
    private double savingsBalance; // Saldo actual de ahorros.

    @Column(nullable = false)
    private double minSavingsRequired; // Saldo mínimo requerido (en función del préstamo solicitado).

    @Column
    private String savingsConsistency; // Estado de consistencia del ahorro (e.g., "Consistente", "Irregular").

    @Column
    private String savingsComments; // Comentarios sobre la evaluación del ahorro.

    // Estado de la evaluación
    @Column(nullable = false)
    private String evaluationResult; // Resultado de la evaluación (e.g., "Pendiente", "Aprobado", "Rechazado").

    @Column
    private String evaluationComments; // Comentarios adicionales del evaluador.
}



