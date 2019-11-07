package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.item.ItemDetailDTO;
import cz.zorganizovano.backend.bean.item.ItemListEntry;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.entity.ItemDetail;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cz.zorganizovano.backend.dao.ItemDetailDao;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemEndpoint {

    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private ItemDetailDao stockItemDetailDao;
    
    @GetMapping
    public List<ItemListEntry> getAllItems() {
        List<StockItem> stockItems = stockItemDao.findByDisplayOnEshop(true);
        return stockItems.stream()
            .map(stockItem -> new ItemListEntry(stockItem))
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ItemDetailDTO getItem(@PathVariable long id) {
        Optional<StockItem> stockItemMaybe = stockItemDao.findById(id);
        if (stockItemMaybe.isPresent()) {
            StockItem stockItem = stockItemMaybe.get();
            List<ItemDetail> itemDetails = stockItemDetailDao.findByItem(stockItem.getItem());

            return new ItemDetailDTO(stockItem, itemDetails);
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Item {0} not found!", id));
        }
    }

}