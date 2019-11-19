package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {

    @Query("SELECT SUM(i.quantity * i.price) FROM OrderItem i WHERE i.order.id = :orderId GROUP BY i.order.id")
    long getTotalOrderItemsPrice(long orderId);
    
}
