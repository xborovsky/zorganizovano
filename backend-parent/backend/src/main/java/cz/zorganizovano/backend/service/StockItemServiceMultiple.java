package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.stock.CreateStockItemMultiple;

public interface StockItemServiceMultiple {
    
    void createNewStockItems(CreateStockItemMultiple createStockItem);
    
}
