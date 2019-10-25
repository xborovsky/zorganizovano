package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.OrderMailNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderMailNotificationDao extends JpaRepository<OrderMailNotification, Long> {

}
