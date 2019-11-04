package cz.zorganizovano.backend.bean.shopping_cart;

import cz.zorganizovano.backend.entity.Item;

public class ShoppingCartItemResponse {

    private final long id;
    private final String name;
    private final String subName;
    private final double priceSingle;
    private final int warehouseCnt;

    public ShoppingCartItemResponse(Item item, int warehouseCnt) {
        this.id = item.getId();
        this.name = item.getName();
        this.subName = item.getSubName();
        this.priceSingle = item.getPrice();
        this.warehouseCnt = warehouseCnt;
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

    public int getWarehouseCnt() {
        return warehouseCnt;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + (int) (this.id ^ (this.id >>> 32));
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ShoppingCartItemResponse other = (ShoppingCartItemResponse) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

}
