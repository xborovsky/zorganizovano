package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.order.DiscountCodeRequest;
import cz.zorganizovano.backend.dao.DiscountCodeDao;
import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.validator.DiscountCodeValidator;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/discount-code")
public class DiscountCodeEndpoint {
    
    @Autowired
    private DiscountCodeDao discountCodeDao;
    @Autowired
    private DiscountCodeValidator discountCodeValidator;

    @PostMapping
    public ResponseEntity getDiscountCode(@RequestBody DiscountCodeRequest request) {
        // TODO unit test!!!
        Optional<DiscountCode> dcMaybe = discountCodeDao.findByCode(request.getCode());
        if (!dcMaybe.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        DiscountCode discountCode = dcMaybe.get();
        if (!discountCodeValidator.isValid(discountCode)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(dcMaybe.get());
    }
    
}
