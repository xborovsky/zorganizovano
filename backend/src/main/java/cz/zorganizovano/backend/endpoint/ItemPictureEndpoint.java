package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.item.ItemPicture;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.dao.StockItemPictureDao;
import cz.zorganizovano.backend.entity.StockItem;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/picture-item")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemPictureEndpoint {
    
    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private StockItemPictureDao stockItemPictureDao;
    
    @GetMapping(value = "/{id}")
    public List<ItemPicture> getPicturesForGallery(@PathVariable("id") long stockItemId) {
        Optional<StockItem> stockItem = stockItemDao.findById(stockItemId);
        if (stockItem.isPresent()) {
            return stockItemPictureDao.findByStockItemOrderByMainDesc(stockItem.get())
                .stream()
                .map(stockItemPicture -> new ItemPicture(stockItemPicture))
                .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException(
                MessageFormat.format("Stock item id={0} not found!", stockItemId)
            );
        }
    }

    @GetMapping(value = "/{id}/shopping-cart-thumbnail")
    public String getShoppingCartThumbnailLocation(@PathVariable("id") long stockItemId) {
        Optional<StockItem> stockItem = stockItemDao.findById(stockItemId);
        if (stockItem.isPresent()) {
            return stockItem.get().getShoppingCartThumbnailLocation();
        } else {
            throw new ResourceNotFoundException(
                MessageFormat.format("Stock item id={0} not found!", stockItemId)
            );
        }
    }
    
}
