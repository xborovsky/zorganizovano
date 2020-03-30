package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.FreeShippedItems;
import cz.zorganizovano.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FreeShippedItemsDao extends JpaRepository<FreeShippedItems, Long> {

    @Query("SELECT COUNT(fsi) > 0 FROM FreeShippedItems fsi WHERE fsi.item = ?1")
    boolean isFreeShipment(Item item);

}
