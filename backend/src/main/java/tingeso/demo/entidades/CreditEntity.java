package tingeso.demo.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "credits")
public class CreditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal monthlyPayment;

    @Column(nullable = false)
    private BigDecimal loanAmount;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal annualInterestRate;

    @Column(nullable = false)
    private int term;

    @Column(nullable = false)
    private BigDecimal lifeInsurance;

    @Column(nullable = false)
    private BigDecimal fireInsurance;

    @Column(nullable = false)
    private BigDecimal adminFee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CreditType loanType; // Tipo de préstamo
}
