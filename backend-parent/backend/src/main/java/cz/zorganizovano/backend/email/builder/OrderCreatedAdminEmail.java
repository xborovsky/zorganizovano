package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentType;
import java.util.List;

public interface OrderCreatedAdminEmail extends SimpleEmail {

    String build(Order order, List<OrderItem> orderItems, ShipmentType shipmentType,
            AddressDTO shippingAddress, CustomerInfo customerInfo);

}
