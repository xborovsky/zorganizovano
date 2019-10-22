package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDao extends JpaRepository<Customer, Long> {

}
