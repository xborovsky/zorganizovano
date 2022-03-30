package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.stock.AdminStockItem;
import cz.zorganizovano.backend.bean.admin.stock.AdminStockItemDetail;
import cz.zorganizovano.backend.bean.admin.stock.CreateEditStockItem;
import cz.zorganizovano.backend.bean.admin.stock.CreateStockItemMultiple;
import cz.zorganizovano.backend.bean.admin.stock.UpdateStockItemRequest;
import cz.zorganizovano.backend.dao.ItemDao;
import cz.zorganizovano.backend.dao.ItemDetailDao;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.dao.StockItemPictureDao;
import cz.zorganizovano.backend.endpoint.exception.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.ItemDetail;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.StockItemPicture;
import cz.zorganizovano.backend.service.StockItemService;
import cz.zorganizovano.backend.service.StockItemServiceMultiple;
import java.text.MessageFormat;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private ItemDetailDao itemDetailDao;
    @Autowired
    private StockItemPictureDao stockItemPictureDao;
    @Autowired
    private StockItemService stockItemService;
    @Autowired
    private StockItemServiceMultiple stockItemServiceMultiple;
    @Autowired
    private ItemDao itemDao;
    
    @GetMapping
    public List<AdminStockItem> getAdminStockItems() {
        return stockItemDao.findByDisplayOnEshopOrderByQuantityAsc(true)
            .stream()
            .map(stockItem -> new AdminStockItem(stockItem))
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AdminStockItemDetail getAdminStockItemDetail(@PathVariable long id) {
        Optional<StockItem> stockItemOpt = stockItemDao.findById(id);
        if (!stockItemOpt.isPresent()) {
            throw new ResourceNotFoundException(MessageFormat.format("StockItem {0} not found!", id));
        }
        
        StockItem stockItem = stockItemOpt.get();
        List<ItemDetail> itemDetails = itemDetailDao.findByItem(stockItem.getItem());
        Collections.sort(itemDetails, (id1, id2) -> id2.getPriorityOrder() - id1.getPriorityOrder());
        List<StockItemPicture> pictures = stockItemPictureDao.findByStockItemOrderByMainDesc(stockItem);

        return new AdminStockItemDetail(stockItemOpt.get(), itemDetails, pictures);
    }
    
    @PostMapping("/{id}/quantity")
    public StockItem updateStockItemQuantity(@PathVariable long id, @RequestBody UpdateStockItemRequest request) {
        Optional<StockItem> stockItemOpt = stockItemDao.findById(id);
        if (!stockItemOpt.isPresent()) {
            throw new ResourceNotFoundException(MessageFormat.format("StockItem {0} not found!", id));
        }
        
        StockItem stockItem = stockItemOpt.get();
        stockItem.setQuantity(request.getQuantity());
        return stockItemDao.saveAndFlush(stockItem);
    }

    @PostMapping
    @CacheEvict(value = "items", allEntries = true)
    public ResponseEntity<Void> createStockItem(@Valid @RequestBody CreateEditStockItem createStockItem) {
        stockItemService.createNewStockItem(createStockItem);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}")
    @Caching(evict = {
        @CacheEvict(value = "items", allEntries = true),
        @CacheEvict(value = "item", key = "#id" )
    })
    public ResponseEntity updateStockItem(@PathVariable long id, @RequestBody CreateEditStockItem editStockItem) {
        Optional<Item> itemOpt = itemDao.findById(id);
        if (!itemOpt.isPresent()) {
            throw new ResourceNotFoundException(MessageFormat.format("Item id={0} not found!", id));
        }
        
        stockItemService.updateStockItem(itemOpt.get(), editStockItem);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/multiple")
    @CacheEvict(value = "items", allEntries = true)
    public ResponseEntity<Void> createStockItemMultiple(@Valid @RequestBody CreateStockItemMultiple createStockItem) {
        stockItemServiceMultiple.createNewStockItems(createStockItem);
        return ResponseEntity.ok().build();
    }
    
}
