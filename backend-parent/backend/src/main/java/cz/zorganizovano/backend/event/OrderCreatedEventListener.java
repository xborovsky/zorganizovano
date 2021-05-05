package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.dao.StockItemDao;
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
import cz.zorganizovano.backend.email.builder.StockItemsShortageEmail;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.service.MailNotificationService;
import java.util.stream.Collectors;

@Component
public class OrderCreatedEventListener implements ApplicationListener<OrderCreatedEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(OrderCreatedEventListener.class);
    
    private static final int STOCK_QUANTITY_WARNING_CNT = 2;

    @Autowired
    private EmailService emailService;
    @Autowired
    private MailNotificationService mailNotificationService;
    @Autowired
    private OrderCreatedCustomerEmail customerEmail;
    @Autowired
    private OrderCreatedAdminEmail adminEmail;
    @Autowired
    private StockItemsShortageEmail stockItemsShortageEmail;
    @Autowired
    private StockItemDao stockItemDao;

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();
        List<OrderItem> orderItems = event.getOrderItems();
        PaymentInfo paymentInfo = event.getPaymentInfo();
        ShipmentType shipmentType = event.getShipmentType();
        AddressDTO shippingAddress = event.getShipmentAddress();
        CustomerInfo customerInfo = event.getCustomerInfo();

        sendEmailToCustomer(order, orderItems, paymentInfo, shipmentType, shippingAddress);

        sendEmailToAdmin(order, orderItems, shipmentType, shippingAddress, customerInfo);
        
        // check number of items on stock
        List<StockItem> shortageItems = event.getOrderItems()
            .stream()
            .map(orderItem -> stockItemDao.findByItem(orderItem.getItem()))
            .filter(stockItem -> stockItem.getQuantity() <= STOCK_QUANTITY_WARNING_CNT)
            .collect(Collectors.toList());
        
        if (!shortageItems.isEmpty()) {
            sendShortageStockItemsToAdmin(shortageItems);
        }
    }

    protected void sendEmailToCustomer(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo, ShipmentType shipmentType, AddressDTO shippingAddress) {
        String recipient = order.getCustomer().getEmail();
        String subject = customerEmail.getSubject();
        String text = customerEmail.build(order, orderItems, paymentInfo, shipmentType, shippingAddress);

        doSendMail(recipient, subject, text);
    }

    protected void sendEmailToAdmin(Order order, List<OrderItem> orderItems, ShipmentType shipmentType,
            AddressDTO shippingAddress, CustomerInfo customerInfo) {
        String recipient = EmailService.ADMIN_EMAIL;
        String subject = "Nová objednávka přijata";
        String text = adminEmail.build(order, orderItems, shipmentType, shippingAddress, customerInfo);

        doSendMail(recipient, subject, text);
    }

    protected void sendShortageStockItemsToAdmin(List<StockItem> stockItems) {
        String recipient = EmailService.ADMIN_EMAIL;
        String text = stockItemsShortageEmail.build(stockItems);

        doSendMail(recipient, stockItemsShortageEmail.getSubject(), text);
    }

    protected void doSendMail(String recipient, String subject, String text) {
        try {
            emailService.send(recipient, subject, text);
        } catch (MailException e) {
            LOG.error(MessageFormat.format("Could not send email to {0} - {1}!", recipient, subject), e);
            mailNotificationService.create(recipient, subject, text);
        }
    }

}
