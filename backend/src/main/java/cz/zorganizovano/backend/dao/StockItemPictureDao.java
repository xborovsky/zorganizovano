package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.StockItemPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemPictureDao extends JpaRepository<StockItemPicture, Long> {
    
}
