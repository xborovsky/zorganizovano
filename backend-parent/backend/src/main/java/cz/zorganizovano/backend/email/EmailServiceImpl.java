package cz.zorganizovano.backend.email;

import java.io.File;
import java.io.IOException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void send(String to, String subject, String text) throws MailException {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(ADMIN_EMAIL);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(text, true);

            emailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            throw new MailSendException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public void send(String to, String subject, String text, File attachment) throws IOException {
         try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setFrom(ADMIN_EMAIL);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(text, true);

            messageHelper.addAttachment(attachment.getName(), attachment);

            emailSender.send(mimeMessage);
        } catch (MessagingException | MailException ex) {
            throw new IOException(ex.getMessage(), ex);
        }
    }

}
