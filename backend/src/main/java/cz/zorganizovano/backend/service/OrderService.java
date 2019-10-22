package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.Address;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.entity.Order;

public interface OrderService {

    Order createOrder(CustomerInfo customer, Address shippingAddress, ShoppingCart shoppingCart);

}
