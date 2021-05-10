package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.admin.stock.CreateEditStockItem;
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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StockItemServiceImpl implements StockItemService {
    
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
    public void createNewStockItem(CreateEditStockItem createStockItem) {
        Item item = new Item();
        item.setName(createStockItem.getName());
        item.setSubName(createStockItem.getSubName());
        item.setDescription(createStockItem.getDescription());
        item.setMetaTitle(createStockItem.getMetaTitle());
        item.setPrice(createStockItem.getPrice());

        Optional<ItemCategory> itemCategory = itemCategoryDao.findById(createStockItem.getCategory());
        item.setItemCategory(itemCategory.orElseThrow(IllegalStateException::new));
        
        itemDao.saveAndFlush(item);

        StockItem stockItem = new StockItem();
        stockItem.setDisplayOnEshop(true);
        stockItem.setEnableOnlineShipment(createStockItem.isEnableOnlineShipment());
        stockItem.setItem(item);
        stockItem.setQuantity(0);
        stockItem.setThumbnailLocation(createStockItem.getThumbnailLocation());

        stockItemDao.saveAndFlush(stockItem);

        for (CreateEditStockItem.ItemDetail createItemDetail : createStockItem.getDetails()) {
            ItemDetail itemDetail = new ItemDetail();
            itemDetail.setKey(createItemDetail.getKey());
            itemDetail.setValue(createItemDetail.getValue());
            itemDetail.setPriorityOrder(createItemDetail.getPriorityOrder());
            itemDetail.setItem(item);

            itemDetailDao.saveAndFlush(itemDetail);
        }

        for (CreateEditStockItem.ItemPicture createItemPicture : createStockItem.getPictures()) {
            StockItemPicture stockItemPicture = new StockItemPicture();
            stockItemPicture.setSrc(createItemPicture.getSrc());
            stockItemPicture.setMain(createItemPicture.isMain());
            stockItemPicture.setStockItem(stockItem);

            stockItemPictureDao.saveAndFlush(stockItemPicture);
        }
    }

    @Override
    @Transactional
    public void updateStockItem(Item item, CreateEditStockItem createStockItem) {
        item.setName(createStockItem.getName());
        item.setSubName(createStockItem.getSubName());
        item.setDescription(createStockItem.getDescription());
        item.setMetaTitle(createStockItem.getMetaTitle());
        item.setPrice(createStockItem.getPrice());

        Optional<ItemCategory> itemCategory = itemCategoryDao.findById(createStockItem.getCategory());
        item.setItemCategory(itemCategory.orElseThrow(IllegalStateException::new));
        
        itemDao.saveAndFlush(item);

        StockItem stockItem = stockItemDao.findByItem(item);
        stockItem.setEnableOnlineShipment(createStockItem.isEnableOnlineShipment());
        stockItem.setItem(item);
        stockItem.setThumbnailLocation(createStockItem.getThumbnailLocation());

        stockItemDao.saveAndFlush(stockItem);

        List<ItemDetail> currentSavedItemDetails = itemDetailDao.findByItem(item);
        List<CreateEditStockItem.ItemDetail> newItemDetails = createStockItem.getDetails();
        
        updateItemDetails(item, currentSavedItemDetails, newItemDetails);

        List<StockItemPicture> currentSavedPictures = stockItemPictureDao.findByStockItemOrderByMainDesc(stockItem);
        List<CreateEditStockItem.ItemPicture> newPictures = createStockItem.getPictures();

        updateItemPictures(stockItem, currentSavedPictures, newPictures);
    }

    @Transactional
    private void updateItemDetails(Item foreignKeyItem, List<ItemDetail> currentSavedItemDetails, List<CreateEditStockItem.ItemDetail> newItemDetails) {
        List<Long> newItemDetailIds = newItemDetails.stream()
                .map(item -> item.getId())
                .collect(Collectors.toList());

        List<Long> currentSavedItemDetailIds = currentSavedItemDetails.stream()
                .map(item -> item.getId())
                .collect(Collectors.toList());

        // delete
        currentSavedItemDetails.stream()
            .filter(curr -> !newItemDetailIds.contains(curr.getId()))
            .forEach(curr -> itemDetailDao.delete(curr));
        
        // update existing
        newItemDetails.stream()
            .filter(newItem -> currentSavedItemDetailIds.contains(newItem.getId()))
            .forEach(newItem -> {
                ItemDetail itemDetail = itemDetailDao.findById(newItem.getId()).orElseThrow();
                itemDetail.setKey(newItem.getKey());
                itemDetail.setValue(newItem.getValue());
                itemDetail.setPriorityOrder(newItem.getPriorityOrder());

                itemDetailDao.saveAndFlush(itemDetail);
            });

        // create
        newItemDetails.stream()
            .filter(newItem -> !currentSavedItemDetailIds.contains(newItem.getId()))
            .forEach(newItem -> {
                ItemDetail itemDetail = new ItemDetail();
                itemDetail.setKey(newItem.getKey());
                itemDetail.setValue(newItem.getValue());
                itemDetail.setPriorityOrder(newItem.getPriorityOrder());
                itemDetail.setItem(foreignKeyItem);

                itemDetailDao.saveAndFlush(itemDetail);
            });
    }

    @Transactional
    private void updateItemPictures(StockItem foreignKeyStockItem, List<StockItemPicture> currentPictures, List<CreateEditStockItem.ItemPicture> newPictures) {
        List<Long> newPicturesIds = newPictures.stream()
                .map(item -> item.getId())
                .collect(Collectors.toList());

        List<Long> currentSavedPicturesIds = currentPictures.stream()
                .map(item -> item.getId())
                .collect(Collectors.toList());

        // delete
        currentPictures.stream()
            .filter(curr -> !newPicturesIds.contains(curr.getId()))
            .forEach(curr -> stockItemPictureDao.delete(curr));
        
        // update existing
        newPictures.stream()
            .filter(newPicture -> currentSavedPicturesIds.contains(newPicture.getId()))
            .forEach(newPicture -> {
                StockItemPicture picture = stockItemPictureDao.findById(newPicture.getId()).orElseThrow();
                picture.setSrc(newPicture.getSrc());
                picture.setMain(newPicture.isMain());

                stockItemPictureDao.saveAndFlush(picture);
            });

        // create
        newPictures.stream()
            .filter(newPicture -> !currentSavedPicturesIds.contains(newPicture.getId()))
            .forEach(newPicture -> {
                StockItemPicture picture = new StockItemPicture();
                picture.setSrc(newPicture.getSrc());
                picture.setMain(newPicture.isMain());
                picture.setStockItem(foreignKeyStockItem);

                stockItemPictureDao.saveAndFlush(picture);
            });
    }
    
}
