package tingeso.demo.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Esta anotación generará automáticamente getters, setters, toString, equals y hashCode
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class CreditType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // Nombre del tipo de préstamo, ej. "Primera Vivienda"
    private int maxTerm; // Plazo máximo en años, ej. 30
    private double minInterestRate; // Tasa mínima de interés anual, ej. 3.5
    private double maxInterestRate; // Tasa máxima de interés anual, ej. 5.0
    private double maxFinancingPercentage; // Porcentaje máximo de financiamiento, ej. 80%
}
