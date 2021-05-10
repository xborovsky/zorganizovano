package cz.zorganizovano.backend.bean.admin.stock;

import cz.zorganizovano.backend.entity.StockItem;

public class AdminStockItem {

    private final long id;
    private final long itemId;
    private final String name;
    private final String subName;
    private final int quantity;

    public AdminStockItem(StockItem stockItem) {
        this.id = stockItem.getId();
        this.itemId = stockItem.getItem().getId();
        this.name = stockItem.getItem().getName();
        this.subName = stockItem.getItem().getSubName();
        this.quantity = stockItem.getQuantity();
    }

    public long getId() {
        return id;
    }

    public long getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public String getSubName() {
        return subName;
    }

    public int getQuantity() {
        return quantity;
    }

}
