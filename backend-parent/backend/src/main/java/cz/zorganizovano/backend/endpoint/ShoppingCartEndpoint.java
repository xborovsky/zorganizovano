package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.shopping_cart.ShoppingCartItemResponse;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.StockItem;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shopping-cart")
public class ShoppingCartEndpoint {

    private static final String SHOPPING_CART_ITEMS_SESSION_ATTR = "shopping-cart-items";

    @Autowired
    private StockItemDao stockItemDao;

    @PostMapping("/items")
    public Set<ShoppingCartItemResponse> getShoppingCartItems(@RequestBody List<Long> stockItemIds, HttpSession session) {
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

        session.setAttribute(SHOPPING_CART_ITEMS_SESSION_ATTR, resultItems);

        return resultItems;
    }

    @GetMapping("/items")
    public Set<ShoppingCartItemResponse> getShoppingCartItemsFromSession(HttpSession session) {
        Set<ShoppingCartItemResponse> sessionData = (Set<ShoppingCartItemResponse>) session.getAttribute(SHOPPING_CART_ITEMS_SESSION_ATTR);
        return sessionData == null ? Collections.emptySet() : sessionData;
    }

}
