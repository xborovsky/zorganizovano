package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.OrderCreatedAdminEmail;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.text.MessageFormat;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Component;
import cz.zorganizovano.backend.email.builder.OrderCreatedCustomerEmail;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.service.MailNotificationService;

@Component
public class OrderCreatedEventListener implements ApplicationListener<OrderCreatedEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(OrderCreatedEventListener.class);

    @Autowired
    private EmailService emailService;
    @Autowired
    private MailNotificationService mailNotificationService;
    @Autowired
    private OrderCreatedCustomerEmail customerEmail;
    @Autowired
    private OrderCreatedAdminEmail adminEmail;

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();
        List<OrderItem> orderItems = event.getOrderItems();
        PaymentInfo paymentInfo = event.getPaymentInfo();
        ShipmentType shipmentType = event.getShipmentType();
        AddressDTO shippingAddress = event.getShipmentAddress();

        sendEmailToCustomer(order, orderItems, paymentInfo, shipmentType, shippingAddress);

        sendEmailToAdmin(order, orderItems, shipmentType, shippingAddress);
    }

    protected void sendEmailToCustomer(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo, ShipmentType shipmentType, AddressDTO shippingAddress) {
        String recipient = order.getCustomer().getEmail();
        String subject = customerEmail.getSubject();
        String text = customerEmail.build(order, orderItems, paymentInfo, shipmentType, shippingAddress);

        doSendMail(recipient, subject, text);
    }

    protected void sendEmailToAdmin(Order order, List<OrderItem> orderItems, ShipmentType shipmentType, AddressDTO shippingAddress) {
        String recipient = EmailService.ADMIN_EMAIL;
        String subject = "Nová objednávka přijata";
        String text = adminEmail.build(order, orderItems, shipmentType, shippingAddress);

        doSendMail(recipient, subject, text);
    }

    protected void doSendMail(String recipient, String subject, String text) {
        try {
            emailService.send(recipient, subject, text);
        } catch (MailException e) {
            LOG.error(MessageFormat.format("Could not send email to {0}!", recipient), e);
            mailNotificationService.create(recipient, subject, text);
        }
    }

}
