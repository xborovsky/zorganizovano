package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.InvoiceCreatedEmail;
import cz.zorganizovano.backend.email.builder.OrderShippedEmail;
import cz.zorganizovano.backend.email.builder.OrderStornoEmail;
import cz.zorganizovano.backend.email.builder.PaymentReceivedEmail;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.manager.TimeManager;
import cz.zorganizovano.backend.report.InvoiceCreator;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminOrderManagerImpl implements AdminOrderManager {
    
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private TimeManager timeManager;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PaymentReceivedEmail paymentReceivedEmail;
    @Autowired
    private OrderShippedEmail orderShippedEmail;
    @Autowired
    private InvoiceCreatedEmail invoiceCreatedEmail;
    @Autowired
    private InvoiceCreator invoiceCreator;
    @Autowired
    private OrderStornoEmail orderStornoEmail;

    @Value("${zorganizovano.invoice.export.location}")
    private String invoicesFolderLocation;

    @Override
    @Transactional
    public Date updatePaymentReceivedDate(Order order) {
        Date now = timeManager.getCurrentDate();

        emailService.send(order.getCustomer().getEmail(), paymentReceivedEmail.getSubject(), paymentReceivedEmail.build(order));

        order.setPaymentReceived(now);

        return now;
    }

    @Override
    @Transactional
    public Date updateReadyToShipDate(Order order) {
        Date now = timeManager.getCurrentDate();
        order.setReadyToShip(now);

        return now;
    }

    @Override
    @Transactional
    public Date updateInvoiceSentDate(Order order) throws IOException, SQLException {
        Date now = timeManager.getCurrentDate();
        
        invoiceCreator.exportInvoice(order);
        emailService.send(
            order.getCustomer().getEmail(), 
            invoiceCreatedEmail.getSubject(), 
            invoiceCreatedEmail.build(order),
            new File(invoicesFolderLocation + File.separator + order.getOrderNum() + ".pdf")
        );

        order.setInvoiceSent(now);

        return now;
    }

    @Override
    @Transactional
    public Date updateShippedDate(Order order, String trackingNumber) {
        Date now = timeManager.getCurrentDate();
        if (trackingNumber != null) {
            order.setTrackingNumber(trackingNumber);
        }
        

        if (trackingNumber != null) {
            emailService.send(order.getCustomer().getEmail(), orderShippedEmail.getSubject(), orderShippedEmail.build(order, trackingNumber));
        }

        order.setShipped(now);

        return now;
    }

    @Override
    @Transactional
    public Date updateStornoDate(Order order) {
        Date now = timeManager.getCurrentDate();

        orderItemDao.findByOrder(order).forEach(orderItem -> {
            var stockItem = stockItemDao.findByItem(orderItem.getItem());
            stockItem.setQuantity(stockItem.getQuantity() + orderItem.getQuantity());
            stockItemDao.save(stockItem);
        });

        emailService.send(order.getCustomer().getEmail(), orderStornoEmail.getSubject(), orderStornoEmail.build(order));

        order.setStorno(now);
        
        return now;
    }

    @Override
    @Transactional
    public void updateAdminNote(Order order, String note) {
        order.setAdminNote(note);
    }
    
}
