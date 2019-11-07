package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.ShoppingCart;

public interface OrderService {

    int DEFAULT_MATURITY = 5;

    OrderCreatedDTO createOrder(CustomerInfo customer, AddressDTO shippingAddress, ShoppingCart shoppingCart);

}
