package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;

public interface OrderCreatedCustomerEmail {

    String build(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo);

    String getSubject();

}
