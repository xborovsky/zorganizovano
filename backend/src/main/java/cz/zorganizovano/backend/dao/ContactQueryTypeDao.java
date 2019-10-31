package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ContactQueryType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactQueryTypeDao extends JpaRepository<ContactQueryType, Long> {

}
