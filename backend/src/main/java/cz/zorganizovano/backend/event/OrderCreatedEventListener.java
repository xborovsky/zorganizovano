package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.service.OrderMailNotificationServiceImpl;
import java.text.MessageFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedEventListener implements ApplicationListener<OrderCreatedEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(OrderCreatedEventListener.class);

    @Autowired
    private EmailService emailService;
    @Autowired
    private OrderMailNotificationServiceImpl orderMailNotificationServiceImpl;

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();

        sendEmailToCustomer(order);
    }

    protected void sendEmailToCustomer(Order order) {
        //String recipient = order.getCustomer().getEmail();
        String recipient = "TODO";
        String subject = "Vaše objednávka byla přijata";
        String text = "TODO";

        doSendMail(recipient, subject, text);
    }

    protected void sendEmailToAdmin(Order order) {
        String recipient = EmailService.ADMIN_EMAIL;
        String subject = "Nová objednávka na zorganizovano.cz!";
        String text = "TODO";

        doSendMail(recipient, subject, text);
    }

    protected void doSendMail(String recipient, String subject, String text) {
        try {
            emailService.send(recipient, subject, text);
        } catch (MailException e) {
            LOG.error(MessageFormat.format("Could not send email to {0}!", recipient), e);
            orderMailNotificationServiceImpl.create(recipient, subject, text);
        }
    }

}
