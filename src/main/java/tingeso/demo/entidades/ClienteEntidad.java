package tingeso.demo.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client")
@Entity

public class ClienteEntidad {
    private Long id;
    private String rut;
    private String nombre;

    private boolean registro;
    private int ingreso;

    private LocalDate fecha_nacimiento;



}
