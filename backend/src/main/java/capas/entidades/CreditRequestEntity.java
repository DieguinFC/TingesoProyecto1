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
@Table(name = "credit_requests")
public class CreditRequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private BigDecimal requestedAmount;

    @Column(nullable = false)
    private int termInYears;

    @Column(name = "credit_type_id", nullable = false)
    private Long creditTypeId; // Solo guardamos el ID de CreditType como clave foránea

    @Column(nullable = false)
    private String status;

    @ElementCollection
    @CollectionTable(name = "credit_request_files", joinColumns = @JoinColumn(name = "credit_request_id"))
    @Column(name = "file_path")
    private List<String> files;
}
