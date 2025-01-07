package capas.controladores;

import capas.entidades.CreditEvaluationEntity;
import capas.entidades.CreditRequestEntity;
import capas.servicios.CreditEvaluationService;
import capas.servicios.CreditService;  // Asegúrate de tener el servicio de CreditRequest disponible
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credit-evaluation")
public class CreditEvaluationController {

    @Autowired
    private CreditEvaluationService creditEvaluationService;

    @Autowired
    private CreditService creditService;  // Agregado el servicio de CreditRequest

    // Método para obtener todas las solicitudes de crédito
    @GetMapping("/credit-show")
    public ResponseEntity<List<CreditRequestEntity>> getAllCreditRequests() {
        List<CreditRequestEntity> creditRequests = creditService.getAllCreditRequests();
        return ResponseEntity.ok(creditRequests);
    }

    // Método para obtener una solicitud de crédito por ID
    @GetMapping("/credit-request/{id}")
    public ResponseEntity<CreditRequestEntity> getCreditRequestById(@PathVariable Long id) {
        CreditRequestEntity creditRequest = creditService.getCreditRequestById(id);
        return ResponseEntity.ok(creditRequest);
    }

    // Método para evaluar un crédito basado en una solicitud
    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateCredit(@RequestBody CreditEvaluationEntity creditEvaluation) {
        try {
            // Validar que los campos obligatorios no sean nulos
            creditEvaluationService.validateCreditEvaluation(creditEvaluation);

            // Ejecutar la evaluación de crédito
            CreditEvaluationEntity evaluation = creditEvaluationService.evaluateCredit(creditEvaluation);

            // Respuesta exitosa
            return ResponseEntity.ok(evaluation);
        } catch (IllegalArgumentException e) {
            // Manejo de excepciones específicas
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al evaluar el crédito: " + e.getMessage());
        }
    }

    /*
    @GetMapping("/{id}")
    public ResponseEntity<CreditEvaluationEntity> getEvaluation(@PathVariable Long id) {
        return ResponseEntity.of(creditEvaluationService.getEvaluationById(id));
    }
    */
}
