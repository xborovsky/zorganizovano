package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {

}
