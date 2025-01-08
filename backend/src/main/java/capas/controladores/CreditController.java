package capas.controladores;

import capas.entidades.CreditType;
import capas.repos.CreditTypeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import capas.entidades.CreditRequestEntity;
import capas.servicios.CreditService;
import capas.servicios.UserService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/credits")
public class CreditController {

    @Autowired
    private CreditService creditService;

    @Autowired
    private UserService userService; // Inyecta el servicio de usuario

    @Autowired
    private CreditTypeRepository creditTypeRepository; // Inyectar el repositorio de CreditType

    @Autowired
    private ObjectMapper objectMapper; // Agrega el ObjectMapper para convertir JSON

    // Crea una solicitud de crédito
    @PostMapping("/credit-request")
    public ResponseEntity<?> createCreditRequest(
            @RequestPart("creditRequest") String creditRequestJson, // Recibe JSON como String
            @RequestPart("files") List<MultipartFile> files) {

        try {
            // Convertir el JSON a un objeto CreditRequestEntity
            CreditRequestEntity creditRequest = objectMapper.readValue(creditRequestJson, CreditRequestEntity.class);

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
        } catch (Exception e) {
            // Manejo de excepciones
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Hubo un error al procesar la solicitud: " + e.getMessage());
        }
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
    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            // Decode the file name to handle URL encoding
            String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8.toString());
            System.out.println("Decoded file name: " + decodedFileName);

            // Ruta base donde se almacenan los archivos.
            Path filePath = Paths.get("C:/Users/d-cue/Documents/Programin/Tingeso/files").resolve(decodedFileName).normalize();
            System.out.println("Resolved file path: " + filePath);

            // Security check to prevent path traversal
            if (!filePath.startsWith(Paths.get("C:/Users/d-cue/Documents/Programin/Tingeso/files").normalize())) {
                throw new RuntimeException("Intento de acceso no autorizado al archivo: " + decodedFileName);
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + decodedFileName + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("No se puede leer el archivo: " + decodedFileName);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

