package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.shopping_cart.ShoppingCartItemResponse;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.StockItem;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shopping-cart")
public class ShoppingCartEndpoint {

    @Autowired
    private StockItemDao stockItemDao;

    @PostMapping("/items")
    public Set<ShoppingCartItemResponse> getShoppingCartItems(@RequestBody List<Long> stockItemIds) {
        Set<ShoppingCartItemResponse> resultItems = new HashSet<>();

        stockItemIds.stream()
            .map((stockItemId) -> stockItemDao.findById(stockItemId))
            .filter((stockItemMaybe) -> (stockItemMaybe.isPresent()))
            .forEachOrdered((stockItemMaybe) -> {
                StockItem stockItem = stockItemMaybe.get();
                resultItems.add(
                    new ShoppingCartItemResponse(stockItem.getItem(), stockItem.getQuantity())
                );
            }
        );

        return resultItems;
    }

}
