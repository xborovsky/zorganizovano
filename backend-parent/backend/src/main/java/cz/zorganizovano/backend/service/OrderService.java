package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.entity.DiscountCode;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.ShipmentType;

public interface OrderService {

    int DEFAULT_MATURITY = 5;

    OrderCreatedDTO createOrder(CustomerInfo customer, AddressDTO shippingAddress,
            ShoppingCart shoppingCart, ShipmentType shipmentType, String discountCode, String note);

    double calculateTotalPrice(Order order, DiscountCode discountCode);

    double calculateTotalPrice(Order order, double discountValue);

}
