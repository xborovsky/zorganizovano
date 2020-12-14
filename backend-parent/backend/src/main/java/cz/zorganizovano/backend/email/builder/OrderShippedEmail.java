package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;

public interface OrderShippedEmail extends SimpleEmail {
    
    String build(Order order, String trackingNumber);
    
}
