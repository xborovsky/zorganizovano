package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;
import org.springframework.context.ApplicationEvent;

public class OrderCreatedEvent extends ApplicationEvent {

    private final Order order;
    private final List<OrderItem> orderItems;
    private final PaymentInfo paymentInfo;

    public OrderCreatedEvent(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo) {
        super(order);
        this.order = order;
        this.orderItems = orderItems;
        this.paymentInfo = paymentInfo;
    }

    public Order getOrder() {
        return order;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

}
