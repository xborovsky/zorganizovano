package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.StockItemPicture;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemPictureDao extends JpaRepository<StockItemPicture, Long> {
    
    List<StockItemPicture> findByStockItemOrderByMainDesc(StockItem stockItem);
    
    StockItemPicture findByStockItemAndMain(StockItem stockItem, boolean isMain);
    
}
