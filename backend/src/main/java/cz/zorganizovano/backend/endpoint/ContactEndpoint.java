package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.ContactFormBean;
import cz.zorganizovano.backend.dao.ContactQueryTypeDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.entity.ContactQueryType;
import cz.zorganizovano.backend.service.GoogleRecaptchaVerifier;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    @Autowired
    private ContactQueryTypeDao contactQueryTypeDao;

    @GetMapping("/query-types")
    public List<ContactQueryType> getQueryTypes() {
        return contactQueryTypeDao.findAll(Sort.by(Sort.Direction.ASC, "sortKey"));
    }

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
