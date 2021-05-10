package cz.zorganizovano.backend.task;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.PaymentReminderDao;
import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.email.builder.PaymentReminderEmail;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.PaymentReminder;
import cz.zorganizovano.backend.util.DateUtils;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OrderPaymentCheckTask {
    
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

    @Scheduled(cron = "12 0 0 * * ?")
    public void checkOrdersPayment() {
        List<Order> unpaidOrders = orderDao.findUnpaidOrders();
        for (Order unpaidOrder : unpaidOrders) {
            if (dateUtils.getDaysDiff(unpaidOrder.getCreated(), dateUtils.getTodayMidnight()) > NUM_DAYS_LIMIT &&
                    paymentReminderDao.findByOrder(unpaidOrder).isEmpty()) {
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
    }
    
}
