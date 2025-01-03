package capas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import capas.entidades.CreditRequestEntity;
import capas.servicios.CreditService;
import capas.servicios.UserService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/credits")
public class CreditController {

    @Autowired
    private CreditService creditService;

    @Autowired
    private UserService userService; // Inyecta el servicio de usuario

    // Crea una solicitud de crédito
    @PostMapping("/credit-request")
    public ResponseEntity<?> createCreditRequest(
            @RequestPart("creditRequest") CreditRequestEntity creditRequest,
            @RequestPart("files") List<MultipartFile> files) {

        // Verifica si el usuario existe
        if (!userService.userExists(creditRequest.getEmail())) {
            return ResponseEntity.badRequest().body("El correo electrónico no está registrado.");
        }

        // Verifica si hay más de 5 archivos
        if (files.size() > 5) {
            return ResponseEntity.badRequest().body("Se permiten un máximo de 5 archivos.");
        }

        // Verifica que todos los archivos sean PDF
        for (MultipartFile file : files) {
            if (!file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Todos los archivos deben ser en formato PDF.");
            }
        }

        // Guarda la solicitud de crédito junto con los archivos
        CreditRequestEntity createdRequest = creditService.createCreditRequest(creditRequest, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    // Obtiene todas las solicitudes de crédito
    @GetMapping("/credit-requests")
    public ResponseEntity<List<CreditRequestEntity>> getAllCreditRequests() {
        List<CreditRequestEntity> creditRequests = creditService.getAllCreditRequests();
        return ResponseEntity.ok(creditRequests);
    }

    // Obtiene una solicitud de crédito por ID
    @GetMapping("/credit-request/{id}")
    public ResponseEntity<CreditRequestEntity> getCreditRequestById(@PathVariable Long id) {
        CreditRequestEntity creditRequest = creditService.getCreditRequestById(id);
        return ResponseEntity.ok(creditRequest);
    }
}
