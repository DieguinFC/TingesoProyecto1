package tingeso.demo.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.demo.entidades.CreditEntity;
import tingeso.demo.entidades.CreditType;
import tingeso.demo.servicios.CreditService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CreditController {

    @Autowired
    private CreditService creditService;

    @PostMapping("/credit")
    public ResponseEntity<CreditEntity> createCredit(@RequestBody CreditEntity credit) {
        CreditEntity createdCredit = creditService.createCreditEntity(credit);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCredit);
    }

    @GetMapping("/credit-types")
    public ResponseEntity<List<CreditType>> getAllCreditTypes() {
        List<CreditType> creditTypes = creditService.getAllCreditTypes();
        return ResponseEntity.ok(creditTypes);
    }

    @GetMapping("/credit-types/{id}")
    public ResponseEntity<CreditType> getCreditType(@PathVariable Long id) {
        CreditType creditType = creditService.getCreditTypeById(id);
        return ResponseEntity.ok(creditType);
    }
}
