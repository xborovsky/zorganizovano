package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.Order;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface OrderReportService {
    
    ByteArrayInputStream generateReport(List<Order> orders) throws IOException;
    
}
