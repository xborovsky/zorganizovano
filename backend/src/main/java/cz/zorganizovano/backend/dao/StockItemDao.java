package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemDao extends JpaRepository<StockItem, Long> {

    StockItem findByItem(Item item);

}
