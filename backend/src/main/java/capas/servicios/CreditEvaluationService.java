package capas.servicios;

import capas.entidades.CreditEvaluationEntity;
import capas.entidades.CreditRequestEntity;
import capas.entidades.UserEntity;
import capas.repos.CreditEvaluationRepository;
import capas.repos.CreditRepository;
import capas.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditEvaluationService {

    private final CreditEvaluationRepository creditEvaluationRepository;

    @Autowired
    private CreditService creditService;
    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    public CreditEvaluationService(CreditEvaluationRepository creditEvaluationRepository, CreditRepository creditRepository) {
        this.creditEvaluationRepository = creditEvaluationRepository;
    }

    public CreditEvaluationEntity evaluateCredit(CreditEvaluationEntity credit) {

        //if (creditEvaluationRepository.existsById(credit.getId())) {
        //    return credit;
        //}

        // Guardar la evaluación en la base de datos
        creditEvaluationRepository.save(credit);

        // Cambiar status el credit request
        Long crID = credit.getCreditRequestId();
        CreditRequestEntity creditRequest = creditService.getCreditRequestById(crID);
        creditRequest.setStatus(credit.getEvaluationResult());
        creditRepository.save(creditRequest);

        // Retornar la evaluación creada
        return credit;
    }

    public void validateCreditEvaluation(CreditEvaluationEntity creditEvaluation) {
        if (creditEvaluation == null) {
            throw new IllegalArgumentException("La evaluación de crédito no puede ser nula.");
        }
        if (creditEvaluation.getCreditRequestId() == null) {
            throw new IllegalArgumentException("La solicitud de crédito asociada debe tener un ID válido.");
        }
        // Agrega más validaciones según los campos obligatorios de CreditEvaluationEntity
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
