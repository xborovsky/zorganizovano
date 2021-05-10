package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.stock.CreateEditStockItem;
import cz.zorganizovano.backend.entity.Item;

public interface StockItemService {
    
    void createNewStockItem(CreateEditStockItem createStockItem);
    
    void updateStockItem(Item Item, CreateEditStockItem createStockItem);
    
}
