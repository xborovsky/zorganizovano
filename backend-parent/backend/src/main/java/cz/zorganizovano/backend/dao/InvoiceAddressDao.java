package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceAddressDao extends JpaRepository<InvoiceAddress, Long> {

    InvoiceAddress findByOrder(Order order);

}
