package cz.zorganizovano.backend.validator;

import cz.zorganizovano.backend.entity.DiscountCode;

public interface DiscountCodeValidator {
    
    boolean isValid(DiscountCode discountCode);
    
}
