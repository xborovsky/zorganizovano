package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.MailNotification;

public interface MailNotificationService {

    MailNotification create(String mail, String subject, String content);

    void delete(MailNotification mailNotification);

}
