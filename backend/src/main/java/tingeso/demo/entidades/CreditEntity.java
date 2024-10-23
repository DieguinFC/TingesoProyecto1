package tingeso.demo.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "creditos")
public class CreditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key of the entity

    @Column(nullable = false)
    private BigDecimal monthlyPayment; // Cuota

    @Column(nullable = false)
    private BigDecimal loanAmount; // Monto del préstamo

    @Column(nullable = false)
    private float annualInterestRate; // Tasa de interés anual

    @Column(nullable = false)
    private int term; // Plazo

    @Column(nullable = false)
    private BigDecimal lifeInsurance; // Desgravamen

    @Column(nullable = false)
    private int fireInsurance; // Seguro de incendio

    @Column(nullable = false)
    private BigDecimal adminFee; // Comisión por administración
}
