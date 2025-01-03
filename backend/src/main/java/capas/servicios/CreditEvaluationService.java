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
        CreditEvaluationEntity evaluation = new CreditEvaluationEntity();
        evaluation.setCreditRequest(creditRequest);

        // Buscar el usuario por email
        UserEntity user = userRepository.findByEmail(creditRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado para el email: " + creditRequest.getEmail()));

        // Regla 1: Relación cuota/ingreso
        evaluation.setMeetsQuotaIncomeRatio(calculateQuotaIncomeRatio(creditRequest, user));

        // Regla 2: Historial crediticio
        evaluation.setHasGoodCreditHistory(true); // Simulación; reemplazar con lógica real

        // Regla 3: Estabilidad laboral
        evaluation.setMeetsEmploymentStability(checkEmploymentStability(user));

        // Regla 4: Relación deuda/ingreso
        evaluation.setMeetsDebtIncomeRatio(calculateDebtIncomeRatio(creditRequest, user));

        // Regla 5: Requisitos de ahorro
        evaluation.setMeetsSavingsRequirements(checkSavingsRequirements(creditRequest, user));

        // Determinar estado general
        if (isEvaluationSuccessful(evaluation)) {
            evaluation.setStatus("Aprobado");
            evaluation.setComments("Evaluación exitosa.");
        } else {
            evaluation.setStatus("Rechazado");
            evaluation.setComments("No cumple con las condiciones necesarias.");
        }

        return creditEvaluationRepository.save(evaluation);
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

    private boolean isEvaluationSuccessful(CreditEvaluationEntity evaluation) {
        return evaluation.isMeetsQuotaIncomeRatio() &&
                evaluation.isHasGoodCreditHistory() &&
                evaluation.isMeetsEmploymentStability() &&
                evaluation.isMeetsDebtIncomeRatio() &&
                evaluation.isMeetsSavingsRequirements();
    }
}
