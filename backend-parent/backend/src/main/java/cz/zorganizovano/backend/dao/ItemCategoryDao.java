package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ItemCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCategoryDao extends JpaRepository<ItemCategory, Long> {
    
    List<ItemCategory> findByParentId(long parentCategoryId);
    
}
