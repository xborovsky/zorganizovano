package cz.zorganizovano.backend.email;

public interface EmailService {

    void send(String to, String subject, String text);

}
