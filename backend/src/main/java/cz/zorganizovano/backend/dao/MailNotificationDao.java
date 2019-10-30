package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.MailNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailNotificationDao extends JpaRepository<MailNotification, Long> {

}
