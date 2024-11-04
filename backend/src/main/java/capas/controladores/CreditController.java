package capas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import capas.entidades.CreditRequestEntity;
import capas.servicios.CreditService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CreditController {

    @Autowired
    private CreditService creditService;

    // Crea una solicitud de crédito
    @PostMapping("/credit-request")
    public ResponseEntity<CreditRequestEntity> createCreditRequest(@RequestBody CreditRequestEntity creditRequest) {
        CreditRequestEntity createdRequest = creditService.createCreditRequest(creditRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    // Método para obtener todas las solicitudes (opcional, si es necesario)
    @GetMapping("/credit-show")
    public ResponseEntity<List<CreditRequestEntity>> getAllCreditRequests() {
        List<CreditRequestEntity> creditRequests = creditService.getAllCreditRequests();
        return ResponseEntity.ok(creditRequests);
    }

    // Método para obtener una solicitud por ID para revisión (opcional)
    @GetMapping("/credit-request/{id}")
    public ResponseEntity<CreditRequestEntity> getCreditRequestById(@PathVariable Long id) {
        CreditRequestEntity creditRequest = creditService.getCreditRequestById(id);
        return ResponseEntity.ok(creditRequest);
    }
}
