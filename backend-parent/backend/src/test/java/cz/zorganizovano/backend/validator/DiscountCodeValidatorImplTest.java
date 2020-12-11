package cz.zorganizovano.backend.validator;

import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.util.DateUtils;
import java.util.Date;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class DiscountCodeValidatorImplTest {
    @InjectMocks DiscountCodeValidatorImpl validator;
    
    @Mock DateUtils dateUtils;
    
    @Test
    public void testIsValid_oneTimeNotUsed() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setOneTime(true);
        discountCode.setUsed(Boolean.FALSE);
        
        // execution & verification
        assertTrue(validator.isValid(discountCode));
    }
    
    @Test
    public void testIsValid_oneTimeNotUsed2() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setOneTime(true);
        discountCode.setUsed(null);
        
        // execution & verification
        assertTrue(validator.isValid(discountCode));
    }
    
    @Test
    public void testIsValid_oneTimeUsed() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setOneTime(true);
        discountCode.setUsed(Boolean.TRUE);
        
        // execution & verification
        assertFalse(validator.isValid(discountCode));
    }
    
    @Test
    public void testIsValid_notOneTimeBeforeValidUntil() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setOneTime(false);
        discountCode.setValidUntil(new Date());
        
        // behavior
        when(dateUtils.isBeforeCurrentTimestamp(discountCode.getValidUntil())).thenReturn(true);
        
        // execution & verification
        assertTrue(validator.isValid(discountCode));
    }

    @Test
    public void testIsValid_notOneTimeAfterValidUntil() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setOneTime(false);
        discountCode.setValidUntil(new Date());
        
        // behavior
        when(dateUtils.isBeforeCurrentTimestamp(discountCode.getValidUntil())).thenReturn(false);
        
        // execution & verification
        assertFalse(validator.isValid(discountCode));
    }
    
}
