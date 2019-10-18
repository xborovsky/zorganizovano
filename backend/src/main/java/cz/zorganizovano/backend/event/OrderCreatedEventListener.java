package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedEventListener implements ApplicationListener<OrderCreatedEvent> {

    @Autowired
    private EmailService emailService;

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

        emailService.send(recipient, subject, text);
    }

    protected void sendEmailToAdmin(Order order) {
        String recipient = EmailService.ADMIN_EMAIL;
        String subject = "Nová objednávka na zorganizovano.cz!";
        String text = "TODO";

        emailService.send(recipient, subject, text);
    }

}
