package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.dao.ItemCategoryDao;
import cz.zorganizovano.backend.entity.ItemCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item-category")
public class ItemCategoryEndpoint {
    
    @Autowired
    private ItemCategoryDao itemCategoryDao;

    @Cacheable(value = "item-categories", key = "#parentCategoryId")
    @GetMapping("/{parentCategoryId}/children")
    public List<ItemCategory> getCategories(@PathVariable("parentCategoryId") long parentCategoryId) {
        return itemCategoryDao.findByParentId(parentCategoryId);
    }

    @GetMapping("/{id}")
    public ItemCategory getCurrentCategory(@PathVariable("id") long categoryId) {
        Optional<ItemCategory> categoryOpt = itemCategoryDao.findById(categoryId);
        if (!categoryOpt.isPresent()) {
            return itemCategoryDao.findById(1L).get();
        }
        return categoryOpt.get();
    }

    @Cacheable(value = "item-categories")
    @GetMapping
    public List<ItemCategory> getItemCategories() {
        return itemCategoryDao.findAll(Sort.by("name").ascending());
    }
    
}
