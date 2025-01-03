package capas.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "credit_requests") // Renombrado para reflejar que son solicitudes de crédito
public class CreditRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // El correo debe ser único para evitar duplicados
    private String email;

    @Column(nullable = false)
    private BigDecimal requestedAmount; // Monto solicitado por el cliente

    @Column(nullable = false)
    private int termInYears; // Plazo en años para el préstamo

    @ManyToOne
    @JoinColumn(name = "credit_type_id", nullable = false) // Nombre de la columna en la tabla credit_requests
    private CreditType creditType; // Referencia al tipo de crédito

    @Column(nullable = false)
    private String status; // Estado de la solicitud (ejemplo: "Pendiente", "Evaluada", "Aceptada", "Rechazada")

    @ElementCollection
    @CollectionTable(name = "credit_request_files", joinColumns = @JoinColumn(name = "credit_request_id"))
    @Column(name = "file_path")
    private List<String> files; // Lista de rutas de los archivos cargados
}
