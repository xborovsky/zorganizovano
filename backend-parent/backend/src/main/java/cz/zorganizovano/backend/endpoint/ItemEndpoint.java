package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.endpoint.exception.ResourceNotFoundException;
import cz.zorganizovano.backend.bean.PaginatedData;
import cz.zorganizovano.backend.bean.item.ItemDetailDTO;
import cz.zorganizovano.backend.bean.item.ItemListEntry;
import cz.zorganizovano.backend.dao.ItemCategoryDao;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.ItemDetail;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cz.zorganizovano.backend.dao.ItemDetailDao;
import cz.zorganizovano.backend.entity.ItemCategory;
import cz.zorganizovano.backend.service.ItemCategoryService;
import java.util.ArrayList;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/item")
public class ItemEndpoint {
    
    private static final int MAX_LIMIT = 50;

    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private ItemDetailDao stockItemDetailDao;
    @Autowired
    private ItemCategoryDao itemCategoryDao;
    @Autowired
    private ItemCategoryService itemCategoryService;

    @Cacheable("items")
    @GetMapping
    public PaginatedData<ItemListEntry> getAllItems(
        @RequestParam(name = "categoryId", required = false) Long categoryId,
        @RequestParam(name = "limit", required = true) int limit,
        @RequestParam(name = "page", required = true) int page) {
        Pageable pagination = PageRequest.of(page< 0 ? 0 : page, limit > MAX_LIMIT ? MAX_LIMIT : limit, Sort.by(Sort.Direction.DESC, "id"));
        
        List<StockItem> stockItems = new ArrayList<>();
        long totalCnt = 0;
        if (categoryId == null) {
            stockItems = stockItemDao.findByDisplayOnEshop(true, pagination);
            totalCnt = stockItemDao.countByDisplayOnEshop(true);
        } else {
            Optional<ItemCategory> itemCategoryOpt = itemCategoryDao.findById(categoryId);
            if (!itemCategoryOpt.isPresent()) {
                stockItems = stockItemDao.findByDisplayOnEshop(true, pagination);
                totalCnt = stockItemDao.countByDisplayOnEshop(true);
            } else {
                List<ItemCategory> subcategories = itemCategoryService.findAllSubCategoryIdsForCategory(itemCategoryOpt.get().getId());
                if (!subcategories.isEmpty()) {
                    stockItems = stockItemDao.findNotHiddenByItemCategories(subcategories, pagination);
                    totalCnt = stockItemDao.countNotHiddenByItemCategories(subcategories);
                }
            }
        }

        return new PaginatedData(
            stockItems.stream()
                .map(stockItem -> new ItemListEntry(stockItem))
                .collect(Collectors.toList()),
            totalCnt
        );
    }

    @Cacheable(value = "item", key = "#id")
    @GetMapping("/{id}")
    public ItemDetailDTO getItem(@PathVariable long id) {
        Optional<StockItem> stockItemMaybe = stockItemDao.findById(id);
        if (stockItemMaybe.isPresent()) {
            StockItem stockItem = stockItemMaybe.get();
            List<ItemDetail> itemDetails = stockItemDetailDao.findByItem(stockItem.getItem());

            return new ItemDetailDTO(stockItem, itemDetails);
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Item {0} not found!", id));
        }
    }
    
    @GetMapping("/{id}/quantity")
    public int getItemQuantity(@PathVariable long id) {
        Optional<StockItem> stockItemMaybe = stockItemDao.findById(id);
        if (stockItemMaybe.isPresent()) {
            StockItem stockItem = stockItemMaybe.get();
            return stockItem.getQuantity();
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Item {0} not found!", id));
        }
    }

}
