package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDao extends JpaRepository<Item, Long> {
    
}
