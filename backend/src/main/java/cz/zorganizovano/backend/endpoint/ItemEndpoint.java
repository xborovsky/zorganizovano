package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.dao.ItemDao;
import cz.zorganizovano.backend.entity.Item;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemEndpoint {
    
    @Autowired
    private ItemDao itemDao;
    
    @GetMapping
    public List<Item> getAllItems() {
        return itemDao.findAll();
    }

}
