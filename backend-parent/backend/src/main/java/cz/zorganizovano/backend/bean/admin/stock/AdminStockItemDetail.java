package cz.zorganizovano.backend.bean.admin.stock;

import cz.zorganizovano.backend.entity.ItemCategory;
import cz.zorganizovano.backend.entity.ItemDetail;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.StockItemPicture;
import java.util.List;

public class AdminStockItemDetail {

    private final long id;
    private final String name;
    private final String subName;
    private final String description;
    private final double price;
    private final String metaTitle;
    private final ItemCategory itemCategory;
    private final boolean enableOnlineShipment;
    private final List<ItemDetail> itemDetails;
    private final String thumbnailLocation;
    private final List<StockItemPicture> pictures;

    public AdminStockItemDetail(StockItem stockItem, List<ItemDetail> itemDetails, List<StockItemPicture> pictures) {
        this.id = stockItem.getItem().getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.description = stockItem.getItem().getDescription();
        this.price = stockItem.getItem().getPrice();
        this.metaTitle = stockItem.getItem().getMetaTitle();
        this.itemCategory = stockItem.getItem().getItemCategory();
        this.enableOnlineShipment = stockItem.isEnableOnlineShipment();
        this.itemDetails = itemDetails;
        this.thumbnailLocation = stockItem.getThumbnailLocation();
        this.pictures = pictures;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSubName() {
        return subName;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public ItemCategory getItemCategory() {
        return itemCategory;
    }

    public boolean isEnableOnlineShipment() {
        return enableOnlineShipment;
    }

    public List<ItemDetail> getItemDetails() {
        return itemDetails;
    }

    public String getThumbnailLocation() {
        return thumbnailLocation;
    }

    public List<StockItemPicture> getPictures() {
        return pictures;
    }

}
