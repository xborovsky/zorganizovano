package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.service.OrderReportService;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders/report")
public class OrdersReportEndpoint {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderReportService orderReportService;

    @GetMapping(produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseBody
    public ResponseEntity<InputStreamResource> getAllOrders() throws IOException {
        List<Order> orders = orderDao.findOrdersForReport();
        ByteArrayInputStream bis = orderReportService.generateReport(orders);

        return new ResponseEntity(new InputStreamResource(bis), HttpStatus.OK);
    }
}
