package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.entity.DiscountCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountCodeDao extends JpaRepository<DiscountCode, Long> {
    
    Optional<DiscountCode> findByCode(String code);
    
}
