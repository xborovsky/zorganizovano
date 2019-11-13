package cz.zorganizovano.backend.event;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;
import org.springframework.context.ApplicationEvent;

public class OrderCreatedEvent extends ApplicationEvent {

    private final Order order;
    private final List<OrderItem> orderItems;
    private final PaymentInfo paymentInfo;
    private final ShipmentType shipmentType;
    private final AddressDTO shipmentAddress;
    private final CustomerInfo customerInfo;

    public OrderCreatedEvent(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo, ShipmentType shipmentType, AddressDTO shipmentAddress, CustomerInfo customerInfo) {
        super(order);
        this.order = order;
        this.orderItems = orderItems;
        this.paymentInfo = paymentInfo;
        this.shipmentType = shipmentType;
        this.shipmentAddress = shipmentAddress;
        this.customerInfo = customerInfo;
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

    public ShipmentType getShipmentType() {
        return shipmentType;
    }

    public AddressDTO getShipmentAddress() {
        return shipmentAddress;
    }

    public CustomerInfo getCustomerInfo() {
        return customerInfo;
    }

}
