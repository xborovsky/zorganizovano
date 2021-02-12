package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.ItemCategory;
import java.util.List;

public interface ItemCategoryService {
    
    List<ItemCategory> findAllSubCategoryIdsForCategory(long categoryId);
    
}
