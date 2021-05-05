package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.report.OrderReportFormData;
import cz.zorganizovano.backend.service.ZasilkovnaCSVGeneratorServiceImpl;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders/zasilkovna-csv")
public class OrdersZasilkovnaCSVEndpoint {
    
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private ZasilkovnaCSVGeneratorServiceImpl csvGeneratorService;

    @PostMapping(produces = "text/csv")
    @ResponseBody
    public ResponseEntity<InputStreamResource> getAllOrders(@RequestBody OrderReportFormData orderReportData) throws IOException {
        List<Order> orders = orderDao.findOrdersForReport(orderReportData.getOrderIds());
        ByteArrayInputStream bis = csvGeneratorService.buildCSVFile(orders);

        return new ResponseEntity(new InputStreamResource(bis), HttpStatus.OK);
    }
    
}
