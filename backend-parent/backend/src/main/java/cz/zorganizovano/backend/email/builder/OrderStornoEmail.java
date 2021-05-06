package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;

public interface OrderStornoEmail extends SimpleEmail {
    
    String build(Order order);
    
}
