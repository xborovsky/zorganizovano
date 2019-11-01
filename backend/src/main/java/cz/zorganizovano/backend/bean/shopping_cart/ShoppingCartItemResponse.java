package cz.zorganizovano.backend.bean.shopping_cart;

import cz.zorganizovano.backend.entity.Item;

public class ShoppingCartItemResponse {

    private final long id;
    private final String name;
    private final String subName;
    private final double priceSingle;

    public ShoppingCartItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.subName = item.getSubName();
        this.priceSingle = item.getPrice();
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

    public double getPriceSingle() {
        return priceSingle;
    }

}
