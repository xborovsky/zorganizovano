package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;

public interface OrderCreatedCustomerEmail extends SimpleEmail {

    String build(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo, ShipmentType shipmentType, AddressDTO shippingAddress);

}
