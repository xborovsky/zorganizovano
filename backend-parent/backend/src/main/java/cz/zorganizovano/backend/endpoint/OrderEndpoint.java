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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger LOG = LoggerFactory.getLogger(OrderEndpoint.class);

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
        LOG.info("Create order handler", order);
        OrderCreatedDTO created = orderService.createOrder(
            order.getCustomerInfo(),
            order.getShippingAddress(),
            order.getShoppingCart(),
            order.getShipmentType()
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
                created.getShippingAddress(),
                order.getCustomerInfo()
            )
        );

        LOG.info("Order successfully created.");
        
        return new OrderSuccessResponse(created.getOrder().getOrderNum(), paymentInfo);
    }

}
