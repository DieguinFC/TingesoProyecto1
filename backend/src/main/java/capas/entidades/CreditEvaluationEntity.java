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
    private CreditRequestEntity creditRequest;

    @Column(nullable = false)
    private boolean meetsQuotaIncomeRatio; // Cumple relación cuota/ingreso

    @Column(nullable = false)
    private boolean hasGoodCreditHistory; // Tiene buen historial crediticio

    @Column(nullable = false)
    private boolean meetsEmploymentStability; // Cumple estabilidad laboral

    @Column(nullable = false)
    private boolean meetsDebtIncomeRatio; // Cumple relación deuda/ingreso

    @Column(nullable = false)
    private boolean meetsSavingsRequirements; // Cumple requisitos de ahorro

    @Column(nullable = false)
    private String status; // Estado: "Pendiente", "Aprobado", "Rechazado"

    @Column(nullable = false)
    private String comments; // Comentarios adicionales del evaluador
}
