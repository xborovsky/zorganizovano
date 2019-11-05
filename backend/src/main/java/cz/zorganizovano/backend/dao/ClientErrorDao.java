package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ClientError;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientErrorDao extends JpaRepository<ClientError, Long> {

}
