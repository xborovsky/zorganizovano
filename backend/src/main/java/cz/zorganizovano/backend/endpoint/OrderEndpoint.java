package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderFormBean;
import cz.zorganizovano.backend.bean.order.OrderSuccessResponse;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.payment.PaymentInfo;
import cz.zorganizovano.backend.service.OrderService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class OrderEndpoint {

    @Autowired
    private OrderService orderService;

    @PostMapping("/customer")
    public void validateCustomer(@Valid @RequestBody CustomerInfo customer) {
        // pouze validace, ok
    }

    @GetMapping("/delivery-options")
    public ShipmentType[] getDeliveryOptions() {
        return ShipmentType.values();
    }

    @PostMapping("/confirm")
    public OrderSuccessResponse createOrder(@Valid @RequestBody OrderFormBean order) {
        // TODO validate warehouse cnt for each item
        Order created = orderService.createOrder(
            order.getCustomerInfo(),
            order.getShippingAddress(),
            order.getShoppingCart()
        );
        
        PaymentInfo paymentInfo = new PaymentInfo(
            String.valueOf(created.getOrderNum()),
            0, // TODO
            created.getMaturity()
        );
        return new OrderSuccessResponse(created.getOrderNum(), paymentInfo);
    }

}
