package cz.zorganizovano.backend.email;

import java.io.File;
import java.io.IOException;
import org.springframework.mail.MailException;

public interface EmailService {

    String ADMIN_EMAIL = "zorganizovano@gmail.com";

    void send(String to, String subject, String text) throws MailException;
    
    void send(String to, String subject, String text, File attachment) throws MailException, IOException;

}
