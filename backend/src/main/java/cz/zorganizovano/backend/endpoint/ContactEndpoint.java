package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.ContactFormBean;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.service.GoogleRecaptchaVerifier;
import java.io.IOException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class ContactEndpoint {

    @Autowired
    private EmailService emailService;
    @Autowired
    private GoogleRecaptchaVerifier recaptchaVerifier;

    @PostMapping
    public ResponseEntity<Void> submitContactForm(@Valid @RequestBody ContactFormBean contactFormBean) throws IOException {
        if (recaptchaVerifier.isValid(contactFormBean.getRecaptchaToken())) {
            String recipient = EmailService.ADMIN_EMAIL;
            String subject = "Nový dotaz na zorganizovano.cz!";
            String text = buildText(contactFormBean);

            emailService.send(recipient, subject, text);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    
    protected String buildText(ContactFormBean contactFormBean) {
        StringBuilder sb = new StringBuilder();
        sb.append("Jméno: ").append(contactFormBean.getName()).append("\n")
            .append("Email: ").append(contactFormBean.getName()).append("\n")
            .append("Typ dotazu: ").append(contactFormBean.getName()).append("\n")
            .append("Dotaz: ").append(contactFormBean.getName());
        return sb.toString();
    } 

}
