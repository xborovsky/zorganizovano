package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.OrderItem;

public class AdminOrderProductItem {

    private final long id;
    private final String name;
    private final String subName;
    private final double price;
    private final int quantity;

    public AdminOrderProductItem(OrderItem orderItem) {
        this.id = orderItem.getId();
        this.name = orderItem.getItem().getName();
        this.subName = orderItem.getItem().getSubName();
        this.price = orderItem.getPrice() * orderItem.getQuantity();
        this.quantity = orderItem.getQuantity();
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

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

}
