package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.dao.ItemDao;
import cz.zorganizovano.backend.entity.Item;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemEndpoint {
    
    @Autowired
    private ItemDao itemDao;
    
    @GetMapping
    public List<Item> getAllItems() {
        return itemDao.findAll();
    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable long id) {
        Optional<Item> item = itemDao.findById(id);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Item {0} not found!", id));
        }
    }

}
