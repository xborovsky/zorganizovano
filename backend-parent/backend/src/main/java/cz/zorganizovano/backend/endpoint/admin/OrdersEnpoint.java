package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.entity.Order;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrdersEnpoint {

    @Autowired
    private OrderDao orderDao;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderDao.findAll();
    }

}
