package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.shopping_cart.ShoppingCartItemResponse;
import cz.zorganizovano.backend.dao.StockItemDao;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shopping-cart")
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingCartEndpoint {

    @Autowired
    private StockItemDao stockItemDao;

    @PostMapping("/items")
    public List<ShoppingCartItemResponse> getShoppingCartItems(@RequestBody List<Long> stockItemIds) {
        List<ShoppingCartItemResponse> resultItems = new ArrayList<>();

        stockItemIds.stream()
            .map((stockItemId) -> stockItemDao.findById(stockItemId))
            .filter((stockItemMaybe) -> (stockItemMaybe.isPresent()))
            .forEachOrdered((stockItemMaybe) -> {
                resultItems.add(
                    new ShoppingCartItemResponse(stockItemMaybe.get().getItem())
                );
            }
        );

        return resultItems;
    }

}
