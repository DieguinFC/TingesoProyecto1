package tingeso.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.demo.entidades.CreditEntity;

@Repository
public interface CreditRepository extends JpaRepository<CreditEntity, Long> {
}
