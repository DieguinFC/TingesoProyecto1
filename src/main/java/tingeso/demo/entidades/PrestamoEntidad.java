package tingeso.demo.entidades;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoEntidad {
    private String tipo_prestamo;
    private int plazo_max;
    private float tasa_interes;
    private int monto_max;
}
