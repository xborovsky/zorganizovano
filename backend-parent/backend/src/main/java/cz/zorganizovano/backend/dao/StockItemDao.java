package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.StockItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemDao extends JpaRepository<StockItem, Long> {

    StockItem findByItem(Item item);

    List<StockItem> findByDisplayOnEshopByOrderByIdDesc(boolean displayOnEshop);

}
