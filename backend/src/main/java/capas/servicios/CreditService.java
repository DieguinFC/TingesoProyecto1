package capas.servicios;

import capas.entidades.CreditRequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import capas.entidades.CreditRequestEntity;
import capas.repos.CreditRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CreditService {

    @Autowired
    private CreditRepository creditRepository;

    @Value("${file.upload-dir}") // Directorio base para subir archivos
    private String uploadDir;

    public CreditRequestEntity createCreditRequest(CreditRequestEntity creditRequest, List<MultipartFile> files) {
        // Asigna el estado inicial a la solicitud
        creditRequest.setStatus("Pendiente");

        // Guarda los archivos y registra sus rutas
        List<String> filePaths = new ArrayList<>();
        for (MultipartFile file : files) {
            String filePath = saveFile(file);
            filePaths.add(filePath);
        }
        creditRequest.setFiles(filePaths);

        // Guarda la solicitud en la base de datos
        return creditRepository.save(creditRequest);
    }

    public List<CreditRequestEntity> getAllCreditRequests() {
        return creditRepository.findAll();
    }

    public CreditRequestEntity getCreditRequestById(Long id) {
        return creditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud de crédito no encontrada"));
    }

    private String saveFile(MultipartFile file) {
        try {
            // Ruta completa del archivo
            String filePath = uploadDir + "/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File dest = new File(filePath);
            dest.getParentFile().mkdirs(); // Crea directorios si no existen
            file.transferTo(dest); // Guarda el archivo
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo: " + e.getMessage());
        }
    }
}

