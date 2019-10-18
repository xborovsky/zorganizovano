package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.ContactFormBean;
import cz.zorganizovano.backend.email.EmailService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public void submitContactForm(@Valid @RequestBody ContactFormBean contactFormBean) {
        String recipient = EmailService.ADMIN_EMAIL;
        String subject = "Nový dotaz na zorganizovano.cz!";
        String text = "TODO";

        emailService.send(recipient, subject, text);
    }

}
