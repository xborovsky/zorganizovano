package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.Address;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.ShoppingCart;

public interface OrderService {

    int DEFAULT_MATURITY = 5;

    OrderCreatedDTO createOrder(CustomerInfo customer, Address shippingAddress, ShoppingCart shoppingCart);

}
