package capas.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "loans") // Cambié el nombre de la tabla a 'loans'
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key of the entity

    @Column(nullable = false)
    private String loanType; // tipo_prestamo

    @Column(nullable = false)
    private int maxTerm; // plazo_max

    @Column(nullable = false)
    private float interestRate; // tasa_interes

    @Column(nullable = false)
    private int maxAmount; // monto_max
}
