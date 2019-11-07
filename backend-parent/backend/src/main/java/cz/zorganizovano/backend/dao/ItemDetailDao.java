package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.Item;
import cz.zorganizovano.backend.entity.ItemDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDetailDao extends JpaRepository<ItemDetail, Long> {

    List<ItemDetail> findByItem(Item item);

}
