package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.StockItem;
import java.util.List;

public interface StockItemsShortageEmail extends SimpleEmail {
    
    String build(List<StockItem> stockItems);
    
}
