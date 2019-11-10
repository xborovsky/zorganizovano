package cz.zorganizovano.backend.endpoint;

import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.OrderFormBean;
import cz.zorganizovano.backend.bean.order.OrderSuccessResponse;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.event.OrderCreatedEvent;
import cz.zorganizovano.backend.payment.PaymentInfo;
import cz.zorganizovano.backend.service.OrderService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@Validated
public class OrderEndpoint {

    @Autowired
    private OrderService orderService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

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
        OrderCreatedDTO created = orderService.createOrder(
            order.getCustomerInfo(),
            order.getShippingAddress(),
            order.getShoppingCart()
        );
        
        PaymentInfo paymentInfo = new PaymentInfo(
            String.valueOf(created.getOrder().getOrderNum()),
            created.getTotalPrice(),
            created.getOrder().getMaturity()
        );

        eventPublisher.publishEvent(
            new OrderCreatedEvent(
                created.getOrder(), 
                created.getOrderItems(), 
                paymentInfo,
                order.getShipmentType(),
                created.getShippingAddress()
            )
        );

        return new OrderSuccessResponse(created.getOrder().getOrderNum(), paymentInfo);
    }

}
