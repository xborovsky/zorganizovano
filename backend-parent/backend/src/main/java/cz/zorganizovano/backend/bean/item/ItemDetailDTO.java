package cz.zorganizovano.backend.bean.item;

import cz.zorganizovano.backend.entity.ItemCategory;
import cz.zorganizovano.backend.entity.ItemDetail;
import cz.zorganizovano.backend.entity.StockItem;
import java.util.List;

public class ItemDetailDTO {

    private final long id;
    private final String name;
    private final String subName;
    private final String description;
    private final double price;
    private final Double discountPrice;
    private final int stockQuantity;
    private final List<ItemDetail> details;
    private final ItemCategory itemCategory;

    public ItemDetailDTO(StockItem stockItem, List<ItemDetail> itemDetails) {
        this.id = stockItem.getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.description = stockItem.getItem().getDescription();
        this.price = stockItem.getItem().getPrice();
        this.discountPrice = stockItem.getItem().getDiscountPrice();
        this.stockQuantity = stockItem.getQuantity();
        this.details = itemDetails;
        this.itemCategory = stockItem.getItem().getItemCategory();
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

    public List<ItemDetail> getDetails() {
        return details;
    }

    public ItemCategory getItemCategory() {
        return itemCategory;
    }

}
