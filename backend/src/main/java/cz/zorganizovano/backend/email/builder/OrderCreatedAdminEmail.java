package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.util.List;

public interface OrderCreatedAdminEmail {

    String build(Order order, List<OrderItem> orderItems);

    String getSubject();

}
