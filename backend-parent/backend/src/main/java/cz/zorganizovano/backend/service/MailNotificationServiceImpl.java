package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.email.EmailService;
import cz.zorganizovano.backend.entity.MailNotification;
import cz.zorganizovano.backend.manager.TimeManager;
import java.text.MessageFormat;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import cz.zorganizovano.backend.dao.MailNotificationDao;

@Service
public class MailNotificationServiceImpl implements MailNotificationService {
    private static final Logger LOG = LoggerFactory.getLogger(MailNotificationServiceImpl.class);

    @Autowired
    private TimeManager timeManager;
    @Autowired
    private MailNotificationDao mailNotificationDao;
    @Autowired
    private EmailService emailService;

    @Scheduled(fixedDelay = 5 * 60 * 1000) // 5 minutes
    public void sendUnsentMailNotifications() {
        List<MailNotification> mailNotifications = mailNotificationDao.findAll();

        if (!mailNotifications.isEmpty()) {
            LOG.info(
                MessageFormat.format(
                    "Trying to send {0} previously unsent mail notifications...",
                    mailNotifications.size()
                )
            );
        }

        mailNotifications.forEach((mailNotification) -> {
            try {
                emailService.send(
                    mailNotification.getAddress(),
                    mailNotification.getSubject(),
                    mailNotification.getContent()
                );
                delete(mailNotification);
            } catch (MailException e) {
                LOG.error(
                    MessageFormat.format(
                        "Could not send email to {0}, id={1}!",
                        mailNotification.getAddress(),
                        mailNotification.getId()
                    ),
                    e
                );
            }
        });
    }

    @Scheduled(cron = "1 0 0 * * *")
    public void removeExpiredUnsentMailNotifications() {
        LOG.info("Removing expired unsent mail notifications...");
        List<MailNotification> mailNotifications = mailNotificationDao.findAll();
        mailNotifications.stream()
            .filter((mailNotification) -> (timeManager.getNumDaysBetween(mailNotification.getCreated(), timeManager.getCurrentDate()) > OrderService.DEFAULT_MATURITY))
            .forEachOrdered((mailNotification) -> {
                delete(mailNotification);
            });
    }

    @Override
    @Transactional
    public MailNotification create(String mail, String subject, String content) {
        MailNotification mailNotification = new MailNotification();
        mailNotification.setAddress(mail);
        mailNotification.setSubject(subject);
        mailNotification.setContent(content);
        mailNotification.setCreated(timeManager.getCurrentDate());

        return mailNotificationDao.save(mailNotification);
    }

    @Override
    @Transactional
    public void delete(MailNotification mailNotification) {
        mailNotificationDao.delete(mailNotification);
    }

}
