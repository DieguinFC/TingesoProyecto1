package capas.servicios;

import capas.entidades.CreditEvaluationEntity;
import capas.entidades.CreditRequestEntity;
import capas.entidades.UserEntity;
import capas.repos.CreditEvaluationRepository;
import capas.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditEvaluationService {

    @Autowired
    private CreditEvaluationRepository creditEvaluationRepository;

    @Autowired
    private UserRepository userRepository; // Repositorio para obtener datos del usuario

    public CreditEvaluationEntity evaluateCredit(CreditRequestEntity creditRequest) {
        // Crear una nueva instancia de evaluación
        CreditEvaluationEntity evaluation = new CreditEvaluationEntity();
        evaluation.setCreditRequest(creditRequest);

        creditEvaluationRepository.save(evaluation);
        // Calcular la relación cuota
        return evaluation;
    }

        private boolean calculateQuotaIncomeRatio(CreditRequestEntity creditRequest, UserEntity user) {
        // Lógica para calcular cuota/ingreso
        return creditRequest.getRequestedAmount().doubleValue() / user.getIncome().doubleValue() <= 0.35;
    }

    private boolean checkEmploymentStability(UserEntity user) {
        // Lógica para validar antigüedad laboral o estabilidad financiera
        return true; // Simulación
    }

    private boolean calculateDebtIncomeRatio(CreditRequestEntity creditRequest, UserEntity user) {
        // Lógica para calcular relación deuda/ingreso
        return true; // Simulación
    }

    private boolean checkSavingsRequirements(CreditRequestEntity creditRequest, UserEntity user) {
        // Lógica para validar requisitos de ahorro
        return true; // Simulación
    }

}
