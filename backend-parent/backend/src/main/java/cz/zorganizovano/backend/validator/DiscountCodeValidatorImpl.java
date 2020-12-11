package cz.zorganizovano.backend.validator;

import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountCodeValidatorImpl implements DiscountCodeValidator {
    
    @Autowired
    private DateUtils dateUtils;
    
    @Override
    public boolean isValid(DiscountCode discountCode) {
        if (discountCode.isOneTime()) {
            return !Boolean.TRUE.equals(discountCode.isUsed());
        }
        
        return discountCode.getValidUntil() != null && dateUtils.isBeforeCurrentTimestamp(discountCode.getValidUntil());
    }
    
}
