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
public class CreditoEntidad {

    private int cuota;
    private int monto_prestamo;
    private float tasa_interes_anual;
    private int plazo;
    private float desgravamen;
    private int seguro_incendio;
    private float comision_por_admin;
}
