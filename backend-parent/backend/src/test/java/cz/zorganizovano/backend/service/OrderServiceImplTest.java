package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.validator.DiscountCodeValidator;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class OrderServiceImplTest {
    
    @InjectMocks @Spy OrderServiceImpl orderServiceImpl;
     
    @Mock DiscountCodeValidator discountCodeValidator;
    
    @Test
    public void testCalculateTotalPrice3_1() {
        // definition
        double totalItemsPrice = 1000D;
        double shipmentPrice = 89D;
        double discountValue = 100D;

        // execution
        double result = orderServiceImpl.calculateTotalPrice(totalItemsPrice, shipmentPrice, discountValue);
        
        // verification
        assertEquals(989D, result, 0);
    }
    
    @Test
    public void testCalculateTotalPrice3_2() {
        // definition
        double totalItemsPrice = 100D;
        double shipmentPrice = 89D;
        double discountValue = 200D;

        // execution
        double result = orderServiceImpl.calculateTotalPrice(totalItemsPrice, shipmentPrice, discountValue);
        
        // verification
        assertEquals(89D, result, 0);
    }
    
    @Test
    public void testCalculateDiscount_noDiscountCode() {
        // execution
        double result = orderServiceImpl.calculateDiscount(1000, null);
        
        // verification
        assertEquals(0, result, 0);
    }
    
    @Test
    public void testCalculateDiscount_invalidDiscountCode() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        
        // behavior
        when(discountCodeValidator.isValid(discountCode)).thenReturn(false);
        
        // execution
        double result = orderServiceImpl.calculateDiscount(1000, discountCode);
        
        // verification
        assertEquals(0, result, 0);
    }
    
    @Test
    public void testCalculateDiscount_nonPercentage() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setDiscount(100);
        discountCode.setPercentage(false);

        // behavior
        when(discountCodeValidator.isValid(discountCode)).thenReturn(true);
        
        // execution
        double result = orderServiceImpl.calculateDiscount(1000, discountCode);
        
        // verification
        assertEquals(100, result, 0);
    }
    
    @Test
    public void testCalculateDiscount_percentage() {
        // definition
        DiscountCode discountCode = new DiscountCode(1L);
        discountCode.setDiscount(10);
        discountCode.setPercentage(true);

        // behavior
        when(discountCodeValidator.isValid(discountCode)).thenReturn(true);

        // execution
        double result = orderServiceImpl.calculateDiscount(1000, discountCode);

        // verification
        assertEquals(100, result, 0);
    }
    
}
