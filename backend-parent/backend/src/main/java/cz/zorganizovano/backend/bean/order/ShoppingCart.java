package cz.zorganizovano.backend.bean.order;

import java.util.List;
import javax.validation.Valid;

public class ShoppingCart {

    @Valid
    private List<ShoppingCartItem> items;

    public List<ShoppingCartItem> getItems() {
        return items;
    }

    public void setItems(List<ShoppingCartItem> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "ShoppingCart{" + "items=" + items + '}';
    }

}
