package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ServerNotification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerNotificationDao extends JpaRepository<ServerNotification, Long> {

    Optional<ServerNotification> findFirstByOrderByIdDesc();

}
