package tingeso.demo.entidades;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CreditSimulationEntity {
    private BigDecimal loanAmount;
    private float annualInterestRate;
    private int term; // Plazo en años o meses

}

