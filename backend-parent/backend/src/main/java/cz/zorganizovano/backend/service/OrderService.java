package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.ShipmentType;
import java.util.Date;

public interface OrderService {

    int DEFAULT_MATURITY = 5;

    OrderCreatedDTO createOrder(CustomerInfo customer, AddressDTO shippingAddress,
            ShoppingCart shoppingCart, ShipmentType shipmentType);

    double calculateTotalPrice(Order order);

    Date updatePaymentReceivedDate(Order order);

    Date updateInvoiceSentDate(Order order);

    Date updateShippedDate(Order order);
}
