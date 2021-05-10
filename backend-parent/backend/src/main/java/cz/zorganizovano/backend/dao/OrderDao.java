package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderDao extends JpaRepository<Order, Long> {

    @Query("SELECT COUNT(o) FROM Order o WHERE DATE(o.created) = CURDATE()")
    long countTodayOrders();

    @Query("SELECT o FROM Order o WHERE (o.invoiceSent IS NULL OR (?1 = true AND o.invoiceSent IS NOT NULL)) AND (o.storno IS NULL OR (?2 = true AND o.storno IS NOT NULL)) ORDER BY o.created DESC")
    List<Order> findOrders(boolean invoiceSent, boolean storno);
    
    @Query("SELECT o FROM Order o WHERE o.id IN(?1) ORDER BY o.created DESC")
    List<Order> findOrdersForReport(List<Long> orderIds);

    @Query("SELECT o FROM Order o WHERE o.paymentReceived IS NULL")
    List<Order> findUnpaidOrders();

}
