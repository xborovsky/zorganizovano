package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.stock.CreateStockItemMultiple;
import cz.zorganizovano.backend.dao.ItemCategoryDao;
import cz.zorganizovano.backend.dao.ItemDao;
import cz.zorganizovano.backend.dao.ItemDetailDao;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.dao.StockItemPictureDao;
import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.ItemCategory;
import cz.zorganizovano.backend.entity.ItemDetail;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.StockItemPicture;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StockItemServiceMultipleImpl implements StockItemServiceMultiple {
    
    @Autowired
    private ItemDao itemDao;
    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private ItemDetailDao itemDetailDao;
    @Autowired
    private StockItemPictureDao stockItemPictureDao;
    @Autowired
    private ItemCategoryDao itemCategoryDao;

    @Override
    @Transactional
    public void createNewStockItems(CreateStockItemMultiple createStockItem) {
        final ItemCategory itemCategory = createCategoriesAndReturnTargetCategory(createStockItem.getCategory(), createStockItem.getNewSubcategories());
        final List<Item> items = createNewItems(createStockItem, itemCategory);
        final List<StockItem> stockItems = createStockItems(items, createStockItem.getQuantity(), createStockItem.getImageNamePrefix(), createStockItem.getImageNameSuffix());
        createStockItemPictures(stockItems, createStockItem.getImageNamePrefix(), createStockItem.getImageNameSuffix());
        createItemDetails(items, createStockItem.getDetails());
    }
    
    private ItemCategory createCategoriesAndReturnTargetCategory(long categoryId, String newSubcategories) {
        ItemCategory itemCategory = itemCategoryDao.findById(categoryId).orElseThrow(IllegalStateException::new);
        if (newSubcategories != null && !newSubcategories.isEmpty()) {
            String[] newCategories = newSubcategories.split("->");
            for (String newCategory : newCategories) {
                Optional<ItemCategory> existing = itemCategoryDao.findByParentAndName(itemCategory, newCategory);
                if (existing.isPresent()) {
                    itemCategory = existing.get();
                } else {
                    ItemCategory newItemCategory = new ItemCategory();
                    newItemCategory.setName(newCategory);
                    newItemCategory.setParent(itemCategory);
                    itemCategory = itemCategoryDao.saveAndFlush(newItemCategory);
                }
            }
        }
        
        return itemCategory;
    }
    
    private List<Item> createNewItems(CreateStockItemMultiple createStockItem, ItemCategory itemCategory) {
        List<Item> toCreate = createStockItem.getNames().stream()
            .filter(Predicate.not(String::isBlank))
            .map(itemName -> {
                Item item = new Item();
                item.setName(itemName);
                item.setSubName(createStockItem.getSubName());
                item.setDescription(createStockItem.getDescription());
                item.setMetaTitle(createStockItem.getMetaTitle());
                item.setPrice(createStockItem.getPrice());
                item.setItemCategory(itemCategory);
                return item;
            })
            .collect(Collectors.toList());

        return itemDao.saveAllAndFlush(toCreate);
    }
    
    private List<StockItem> createStockItems(List<Item> items, int quantity, String imagePrefix, String imageSuffix) {
        List<StockItem> stockItems = items.stream().map(item -> {
            StockItem stockItem = new StockItem();
            stockItem.setDisplayOnEshop(true);
            stockItem.setItem(item);
            stockItem.setQuantity(quantity);
            stockItem.setThumbnailLocation(generateImageName(item.getName(), imagePrefix, imageSuffix));
            return stockItem;
        }).collect(Collectors.toList());

        return stockItemDao.saveAllAndFlush(stockItems);
    }

    private void createStockItemPictures(List<StockItem> stockItems, String imagePrefix, String imageSuffix) {
        List<StockItemPicture> stockItemPictures = stockItems.stream().map(stockItem -> {
            StockItemPicture stockItemPicture = new StockItemPicture();
            stockItemPicture.setMain(true);
            stockItemPicture.setStockItem(stockItem);
            stockItemPicture.setSrc(generateImageName(stockItem.getItem().getName(), imagePrefix, imageSuffix));
            return stockItemPicture;
        }).collect(Collectors.toList());

        stockItemPictureDao.saveAllAndFlush(stockItemPictures);
    }
    
    private void createItemDetails(List<Item> items, List<CreateStockItemMultiple.ItemDetail> itemDetails) {
        List<ItemDetail> itemDetailsToStore = new ArrayList<>();
        for (Item item : items) {
            for (CreateStockItemMultiple.ItemDetail createItemDetail : itemDetails) {
                ItemDetail itemDetail = new ItemDetail();
                itemDetail.setKey(createItemDetail.getKey());
                itemDetail.setValue(createItemDetail.getValue());
                itemDetail.setPriorityOrder(createItemDetail.getPriorityOrder());
                itemDetail.setItem(item);

                itemDetailsToStore.add(itemDetail);
            }
        }

        itemDetailDao.saveAllAndFlush(itemDetailsToStore);
    }
    
    private String generateImageName(String itemName, String prefix, String suffix) {
        StringBuilder sb = new StringBuilder();
        if (prefix != null && !prefix.isBlank()) {
            sb = sb.append(prefix).append("_");
        }
        sb = sb.append(itemName);
        if (suffix != null && !suffix.isBlank()) {
            sb = sb.append("_").append(suffix);
        }
        sb = sb.append(".jpg");

        return sb.toString();
    }
    
}
