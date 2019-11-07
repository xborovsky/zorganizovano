package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ShipmentAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentAddressDao extends JpaRepository<ShipmentAddress, Long> {

}
