package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.item.ItemPicture;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.dao.StockItemPictureDao;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.StockItemPicture;
import java.text.MessageFormat;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/picture-item")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemPictureEndpoint {
    
    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private StockItemPictureDao stockItemPictureDao;

    @GetMapping(value = "/{id}/main")
    public ItemPicture getMainPictureBase64(@PathVariable("id") long stockItemId) {
        Optional<StockItem> stockItem = stockItemDao.findById(stockItemId);
        if (stockItem.isPresent()) {
            StockItemPicture stockItemPicture = stockItemPictureDao
                    .findByStockItemAndMain(stockItem.get(), true);
            return new ItemPicture(
                Base64.getEncoder().encodeToString(stockItemPicture.getData()), 
                stockItemPicture.getDataType()
            );
        } else {
            throw new ResourceNotFoundException(
                MessageFormat.format("Stock item id={0} not found!", stockItemId)
            );
        }
    }
    
    @GetMapping(value = "/{id}")
    public List<ItemPicture> getPicturesBase64(@PathVariable("id") long stockItemId) {
        Optional<StockItem> stockItem = stockItemDao.findById(stockItemId);
        if (stockItem.isPresent()) {
            return stockItemPictureDao.findByStockItemOrderByMainDesc(stockItem.get())
                .stream()
                .map(stockItemPicture -> 
                    new ItemPicture(
                        Base64.getEncoder().encodeToString(stockItemPicture.getData()),
                        stockItemPicture.getDataType()
                    )
                )
                .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException(
                MessageFormat.format("Stock item id={0} not found!", stockItemId)
            );
        }
    }
    
}
