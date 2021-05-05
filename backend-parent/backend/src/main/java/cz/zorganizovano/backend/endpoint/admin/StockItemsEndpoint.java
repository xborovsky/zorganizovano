package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.stock.AdminStockItem;
import cz.zorganizovano.backend.bean.admin.stock.UpdateStockItemRequest;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.endpoint.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.StockItem;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/stock-items")
public class StockItemsEndpoint {

    @Autowired
    private StockItemDao stockItemDao;
    
    @GetMapping
    public List<AdminStockItem> getAdminStockItems() {
        return stockItemDao.findByDisplayOnEshopOrderByQuantityAsc(true)
            .stream()
            .map(stockItem -> new AdminStockItem(stockItem))
            .collect(Collectors.toList());
    }
    
    @PostMapping("/{id}")
    public StockItem updateStockItemQuantity(@PathVariable long id, @RequestBody UpdateStockItemRequest request) {
        Optional<StockItem> stockItemOpt = stockItemDao.findById(id);
        if (!stockItemOpt.isPresent()) {
            throw new ResourceNotFoundException(MessageFormat.format("StockItem {0} not found!", id));
        }
        
        StockItem stockItem = stockItemOpt.get();
        stockItem.setQuantity(request.getQuantity());
        return stockItemDao.saveAndFlush(stockItem);
    }
    
}
