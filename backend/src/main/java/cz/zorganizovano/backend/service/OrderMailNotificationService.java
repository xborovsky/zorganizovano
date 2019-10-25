package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.OrderMailNotification;

public interface OrderMailNotificationService {

    OrderMailNotification create(String mail, String subject, String content);

    void delete(OrderMailNotification mailNotification);

}
