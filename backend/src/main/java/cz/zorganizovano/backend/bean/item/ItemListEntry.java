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

    public ItemListEntry(StockItem stockItem) {
        this.id = stockItem.getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.descriptionShort = stockItem.getItem().getDescription().substring(0, 50) + "...";
        this.price = stockItem.getItem().getPrice();
        this.discountPrice = stockItem.getItem().getDiscountPrice();
        this.stockQuantity = stockItem.getQuantity();
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

}
