package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.ContactFormBean;
import cz.zorganizovano.backend.dao.ContactQueryTypeDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.ContactAdminEmail;
import cz.zorganizovano.backend.entity.ContactQueryType;
import cz.zorganizovano.backend.service.GoogleRecaptchaVerifier;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
@Validated
public class ContactEndpoint {
    private static final Logger LOG = LoggerFactory.getLogger(ContactEndpoint.class);

    @Autowired
    private EmailService emailService;
    @Autowired
    private GoogleRecaptchaVerifier recaptchaVerifier;
    @Autowired
    private ContactQueryTypeDao contactQueryTypeDao;
    @Autowired
    private ContactAdminEmail contactAdminEmail;

    @Cacheable("contact-query-types")
    @GetMapping("/query-types")
    public List<ContactQueryType> getQueryTypes() {
        return contactQueryTypeDao.findAll(Sort.by(Sort.Direction.ASC, "sortKey"));
    }

    @PostMapping
    public ResponseEntity<Void> submitContactForm(@Valid @RequestBody ContactFormBean contactFormBean) throws IOException {
        LOG.info("Handle contact form submit", contactFormBean);
        if (recaptchaVerifier.isValid(contactFormBean.getRecaptchaToken())) {
            String recipient = EmailService.ADMIN_EMAIL;
            String subject = contactAdminEmail.getSubject();
            String text = contactAdminEmail.buildText(contactFormBean);

            try {
                emailService.send(recipient, subject, text);
            } catch (MailException e) {
                LOG.error(e.getMessage(), e);
            }

            return ResponseEntity.ok().build();
        } else {
            LOG.warn("Recatcha token not valid!");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}
