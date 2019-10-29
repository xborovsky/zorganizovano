package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.util.List;

public class OrderCreatedDTO {

    private final Order order;
    private final List<OrderItem> orderItems;

    public OrderCreatedDTO(Order order, List<OrderItem> orderItems) {
        this.order = order;
        this.orderItems = orderItems;
    }

    public Order getOrder() {
        return order;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

}
