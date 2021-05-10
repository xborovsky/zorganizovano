package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.PaymentReminder;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentReminderDao extends JpaRepository<PaymentReminder, Long> {
    
    Optional<PaymentReminder> findByOrder(Order order);
    
}
