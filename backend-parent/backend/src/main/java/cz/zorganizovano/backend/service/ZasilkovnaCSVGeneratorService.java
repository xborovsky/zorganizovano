package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.Order;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

public interface ZasilkovnaCSVGeneratorService {
    
    ByteArrayInputStream buildCSVFile(List<Order> orders) throws IOException;
    
}
