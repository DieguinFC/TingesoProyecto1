package capas.repos;


import capas.entidades.CreditEvaluationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditEvaluationRepository extends JpaRepository<CreditEvaluationEntity, Long> {
}
