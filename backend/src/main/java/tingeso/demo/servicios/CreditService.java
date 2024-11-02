package tingeso.demo.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso.demo.entidades.CreditEntity;
import tingeso.demo.entidades.CreditType;
import tingeso.demo.repos.CreditRepository;
import tingeso.demo.repos.CreditTypeRepository;
import java.util.List;

@Service
public class CreditService {

    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    private CreditTypeRepository creditTypeRepository; // Inyectar el repositorio de CreditType

    public CreditEntity createCreditEntity(CreditEntity credit) {
        // Aquí puedes agregar lógica adicional, como calcular la cuota mensual

        // Guardar el crédito en la base de datos
        return creditRepository.save(credit);
    }

    public List<CreditType> getAllCreditTypes() {
        return creditTypeRepository.findAll(); // Obtener todos los tipos de crédito
    }

    public CreditType getCreditTypeById(Long id) {
        return creditTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tipo de crédito no encontrado")); // Manejo de excepciones
    }
}
