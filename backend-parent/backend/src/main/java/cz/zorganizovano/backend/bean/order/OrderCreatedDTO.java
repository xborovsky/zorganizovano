package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.util.List;

public class OrderCreatedDTO {

    private final Order order;
    private final List<OrderItem> orderItems;
    private final AddressDTO shippingAddress;
    private final double totalPrice;
    private final DiscountCode discountCode;

    public OrderCreatedDTO(Order order, List<OrderItem> orderItems, AddressDTO shippingAddress, double totalPrice, DiscountCode discountCode) {
        this.order = order;
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.totalPrice = totalPrice;
        this.discountCode = discountCode;
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

    public DiscountCode getDiscountCode() {
        return discountCode;
    }

}
