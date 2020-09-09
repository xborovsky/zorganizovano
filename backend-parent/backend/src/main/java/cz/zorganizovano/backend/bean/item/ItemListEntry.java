package cz.zorganizovano.backend.bean.item;

import cz.zorganizovano.backend.entity.StockItem;

public class ItemListEntry {

    private final long id;
    private final String name;
    private final String subName;
    private final String descriptionShort;
    private final double price;
    private final Double discountPrice;
    private final int stockQuantity;
    private final String thumbnailLocation;

    public ItemListEntry(StockItem stockItem) {
        this.id = stockItem.getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.descriptionShort = stockItem.getItem().getDescription().length() < 150 ?
            stockItem.getItem().getDescription() :
            stockItem.getItem().getDescription().substring(0, 150) + "...";
        this.price = stockItem.getItem().getPrice();
        this.discountPrice = stockItem.getItem().getDiscountPrice();
        this.stockQuantity = stockItem.getQuantity();
        this.thumbnailLocation = stockItem.getThumbnailLocation();
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

    public String getDescriptionShort() {
        return descriptionShort;
    }

    public double getPrice() {
        return price;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public String getThumbnailLocation() {
        return thumbnailLocation;
    }

}
