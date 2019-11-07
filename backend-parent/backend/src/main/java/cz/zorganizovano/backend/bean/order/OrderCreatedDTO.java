package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.util.List;

public class OrderCreatedDTO {

    private final Order order;
    private final List<OrderItem> orderItems;
    private final AddressDTO shippingAddress;
    private final double totalPrice;

    public OrderCreatedDTO(Order order, List<OrderItem> orderItems, AddressDTO shippingAddress, double totalPrice) {
        this.order = order;
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.totalPrice = totalPrice;
    }

    public Order getOrder() {
        return order;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public AddressDTO getShippingAddress() {
        return shippingAddress;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

}
