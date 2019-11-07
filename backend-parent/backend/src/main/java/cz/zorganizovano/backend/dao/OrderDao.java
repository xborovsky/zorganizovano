package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderDao extends JpaRepository<Order, Long> {

    @Query("SELECT COUNT(o) FROM Order o WHERE DATE(o.created) = CURDATE()")
    long countTodayOrders();

}
