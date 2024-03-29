package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.ItemCategory;
import cz.zorganizovano.backend.entity.StockItem;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StockItemDao extends JpaRepository<StockItem, Long> {

    StockItem findByItem(Item item);

    List<StockItem> findByDisplayOnEshopOrderByIdDesc(boolean displayOnEshop);

    List<StockItem> findByDisplayOnEshopOrderByQuantityAsc(boolean displayOnEshop);

    List<StockItem> findByDisplayOnEshop(boolean displayOnEshop, Pageable pageable);
    
    long countByDisplayOnEshop(boolean displayOnEshop);

    @Query("SELECT stockItem "
            + "FROM StockItem stockItem "
            + "WHERE stockItem.displayOnEshop=true "
            + "AND stockItem.item.itemCategory IN (?1)")
    List<StockItem> findNotHiddenByItemCategories(List<ItemCategory> itemCategory, Pageable pageable);

    @Query("SELECT COUNT(stockItem) "
            + "FROM StockItem stockItem "
            + "WHERE stockItem.displayOnEshop=true "
            + "AND stockItem.item.itemCategory IN (?1)")
    long countNotHiddenByItemCategories(List<ItemCategory> itemCategory);

}
