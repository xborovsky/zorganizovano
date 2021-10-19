package cz.zorganizovano.backend.task;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.PaymentReminderDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.PaymentReminderEmail;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.PaymentReminder;
import cz.zorganizovano.backend.util.DateUtils;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderPaymentCheckTask {
    private static final Logger LOG = LoggerFactory.getLogger(OrderPaymentCheckTask.class);
    
    private static final int NUM_DAYS_LIMIT = 5;
    
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private PaymentReminderDao paymentReminderDao;
    @Autowired
    private DateUtils dateUtils;
    @Autowired
    private PaymentReminderEmail paymentReminderEmail;
    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 12 * * ?")
    public void checkOrdersPayment() {
        LOG.info("--- checkOrdersPayment ---");

        List<Order> unpaidOrders = orderDao.findUnpaidOrders();
        LOG.info(MessageFormat.format("Found {0} unpaid orders!", unpaidOrders.size()));

        for (Order unpaidOrder : unpaidOrders) {
            if (dateUtils.getDaysDiff(unpaidOrder.getCreated(), dateUtils.getTodayMidnight()) > NUM_DAYS_LIMIT &&
                    paymentReminderDao.findByOrder(unpaidOrder).isEmpty()) {
                LOG.info(MessageFormat.format("Sending payment reminder to {0}, order={1}.", unpaidOrder.getCustomer().getEmail(), unpaidOrder));
                emailService.send(
                    unpaidOrder.getCustomer().getEmail(), 
                    paymentReminderEmail.getSubject(), 
                    paymentReminderEmail.build(unpaidOrder)
                );
                PaymentReminder paymentReminder = new PaymentReminder();
                paymentReminder.setOder(unpaidOrder);
                paymentReminder.setSent(new Date());
                
                paymentReminderDao.saveAndFlush(paymentReminder);
            }
        }
        LOG.info("--- checkOrdersPayment finished ---");
    }
    
}
