package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.ItemCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategoryDao extends JpaRepository<ItemCategory, Long> {
    
    List<ItemCategory> findByParentIdOrderByName(long parentCategoryId);

    @Query("SELECT ic FROM ItemCategory ic WHERE ic.parent = ?1 AND lower(ic.name) = lower(?2)")
    Optional<ItemCategory> findByParentAndName(ItemCategory itemCategory, String name);
    
}
