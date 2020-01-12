package cz.zorganizovano.backend.email;

import org.springframework.mail.MailException;

public interface EmailService {

    String ADMIN_EMAIL = "eshoplivy@gmail.com";

    void send(String to, String subject, String text) throws MailException;

}
