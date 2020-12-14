package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.OrderShippedEmail;
import cz.zorganizovano.backend.email.builder.PaymentReceivedEmail;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.manager.TimeManager;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminOrderManagerImpl implements AdminOrderManager {
    
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private TimeManager timeManager;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PaymentReceivedEmail paymentReceivedEmail;
    @Autowired
    private OrderShippedEmail orderShippedEmail;
    
    @Override
    @Transactional
    public Date updatePaymentReceivedDate(Order order) {
        Date now = timeManager.getCurrentDate();
        order.setPaymentReceived(now);
        orderDao.save(order);

        emailService.send(order.getCustomer().getEmail(), paymentReceivedEmail.getSubject(), paymentReceivedEmail.build(order));

        return now;
    }
    
    @Override
    @Transactional
    public Date updateReadyToShipDate(Order order) {
        Date now = timeManager.getCurrentDate();
        order.setReadyToShip(now);
        orderDao.save(order);

        return now;
    }

    @Override
    @Transactional
    public Date updateInvoiceSentDate(Order order) {
        Date now = timeManager.getCurrentDate();
        order.setInvoiceSent(now);
        orderDao.save(order);

        return now;
    }

    @Override
    @Transactional
    public Date updateShippedDate(Order order, String trackingNumber) {
        Date now = timeManager.getCurrentDate();
        order.setShipped(now);
        if (trackingNumber != null) {
            order.setTrackingNumber(trackingNumber);
        }
        orderDao.save(order);

        if (trackingNumber != null) {
            emailService.send(order.getCustomer().getEmail(), orderShippedEmail.getSubject(), orderShippedEmail.build(order, trackingNumber));
        }

        return now;
    }

    @Override
    @Transactional
    public Date updateStornoDate(Order order) {
        Date now = timeManager.getCurrentDate();
        order.setStorno(now);
        orderDao.save(order);

        return now;
    }
    
}
