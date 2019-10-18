package cz.zorganizovano.backend.email;

import org.springframework.mail.MailException;

public interface EmailService {

    String ADMIN_EMAIL = "test@test.cz";

    void send(String to, String subject, String text) throws MailException;

}
