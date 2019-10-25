package cz.zorganizovano.backend.bean.item;

import cz.zorganizovano.backend.entity.StockItem;

public class ItemDetail {

    private final long id;
    private final String name;
    private final String subName;
    private final String description;
    private final double price;
    private final Double discountPrice;
    private final int stockQuantity;
    private final String dimensions;
    private final String shippingDimensions;
    private final double weightGrams;

    public ItemDetail(StockItem stockItem) {
        this.id = stockItem.getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.description = stockItem.getItem().getDescription();
        this.price = stockItem.getItem().getPrice();
        this.discountPrice = stockItem.getItem().getDiscountPrice();
        this.stockQuantity = stockItem.getQuantity();
        this.dimensions = stockItem.getItem().getDimensions();
        this.shippingDimensions = stockItem.getItem().getShippingDimensions();
        this.weightGrams = stockItem.getItem().getWeightGrams();
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

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public String getDimensions() {
        return dimensions;
    }

    public String getShippingDimensions() {
        return shippingDimensions;
    }

    public double getWeightGrams() {
        return weightGrams;
    }

}
