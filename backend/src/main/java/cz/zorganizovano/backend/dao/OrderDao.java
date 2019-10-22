package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Order;
import java.util.Date;
import java.util.List;
import javax.persistence.TemporalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Temporal;

public interface OrderDao extends JpaRepository<Order, Long> {

    List<Order> findByCreated(@Temporal(TemporalType.DATE) Date created);

}
