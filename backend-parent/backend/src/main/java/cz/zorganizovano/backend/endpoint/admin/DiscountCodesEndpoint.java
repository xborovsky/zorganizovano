package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.discount.CreateDiscountCodeRequest;
import cz.zorganizovano.backend.dao.DiscountCodeDao;
import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.util.DateUtils;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/discount-codes")
public class DiscountCodesEndpoint {
    
    @Autowired
    private DiscountCodeDao discountCodeDao;
    @Autowired
    private DateUtils dateUtils;
    
    private final List<Order> discountCodesOrders = Arrays.asList(
        new Order(Sort.Direction.ASC, "used"),
        new Order(Sort.Direction.DESC, "validUntil")
    );
    
    @GetMapping
    public List<DiscountCode> getDiscountCodes() {
        return discountCodeDao.findAll(Sort.by(discountCodesOrders));
    }

    @DeleteMapping("/{id}")
    public void deleteDiscountCode(@PathVariable long id) {
        discountCodeDao.deleteById(id);
    }
    
    @PostMapping
    public DiscountCode createDiscountCode(@RequestBody @Valid CreateDiscountCodeRequest request) throws ParseException {
        if (request.getDiscount() > 100 && request.isPercentage()) {
            throw new IllegalStateException("Discount cannot be more than 100%!");
        } else if (dateUtils.isAfterCurrentTimestamp(request.getValidUntil())) {
            throw new IllegalStateException("Valid until date must be future!");
        }
        
        DiscountCode discountCode = new DiscountCode();
        discountCode.setCode(request.getCode());
        discountCode.setDiscount(request.getDiscount());
        discountCode.setOneTime(request.isOneTime());
        discountCode.setPercentage(request.isPercentage());
        discountCode.setUsed(false);
        discountCode.setValidUntil(request.getValidUntil());
        
        return discountCodeDao.saveAndFlush(discountCode);
    }
    
}
