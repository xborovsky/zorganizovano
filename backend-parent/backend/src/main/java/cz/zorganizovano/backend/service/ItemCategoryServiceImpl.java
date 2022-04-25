package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.dao.ItemCategoryDao;
import cz.zorganizovano.backend.entity.ItemCategory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService {
    
    @Autowired
    private ItemCategoryDao itemCategoryDao;

    @Override
    public List<ItemCategory> findAllSubCategoryIdsForCategory(long categoryId) {
        Optional<ItemCategory> category = itemCategoryDao.findById(categoryId);
        if (category.isPresent()) {
            List<ItemCategory> list = new ArrayList<>();
            list.add(category.get());
            return findAllSubCategoryIdsForCategoryRecursive(list);
        } else {
            return Collections.emptyList();
        }
    }
    
    private List<ItemCategory> findAllSubCategoryIdsForCategoryRecursive(List<ItemCategory> categories) {
        List<ItemCategory> result = new ArrayList<>(categories);

        for (ItemCategory category : categories) {
            List<ItemCategory> subCategories = itemCategoryDao.findByParentIdOrderByName(category.getId());
            if (!subCategories.isEmpty()) {
                result.addAll(findAllSubCategoryIdsForCategoryRecursive(subCategories));
            }
        }

        return result;
    }
    
}
