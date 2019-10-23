package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderFormBean;
import cz.zorganizovano.backend.entity.ShipmentType;
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
    public void createOrder(@Valid @RequestBody OrderFormBean order) {
        // TODO validate warehouse cnt for each item
        orderService.createOrder(
            order.getCustomerInfo(),
            order.getShippingAddress(),
            order.getShoppingCart()
        );
    }

}
