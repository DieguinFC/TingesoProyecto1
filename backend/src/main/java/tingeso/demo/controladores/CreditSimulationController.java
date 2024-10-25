package tingeso.demo.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.demo.entidades.CreditSimulationEntity;
import tingeso.demo.servicios.CreditSimulationService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/creditsimulation")
public class CreditSimulationController {

    @Autowired
    private CreditSimulationService creditSimulationService;

    @PostMapping("/simulate")
    public ResponseEntity<BigDecimal> simulateCredit(@RequestBody CreditSimulationEntity request) {
        BigDecimal monthlyPayment = creditSimulationService.calculateMonthlyPayment(
                request.getLoanAmount(),
                request.getAnnualInterestRate(),
                request.getTerm()
        );

        return ResponseEntity.ok(monthlyPayment);
    }
}

