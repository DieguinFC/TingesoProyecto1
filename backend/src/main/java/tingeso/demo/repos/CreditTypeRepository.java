package tingeso.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.demo.entidades.CreditType;

@Repository
public interface CreditTypeRepository extends JpaRepository<CreditType, Long> {
    // Puedes agregar métodos personalizados aquí si es necesario
}
