package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order, Long> {
    
}
