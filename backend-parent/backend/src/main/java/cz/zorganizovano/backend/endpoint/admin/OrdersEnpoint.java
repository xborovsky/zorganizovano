package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.order.AdminOrderDetail;
import cz.zorganizovano.backend.bean.admin.order.AdminOrderListItem;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.endpoint.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.service.OrderService;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders")
public class OrdersEnpoint {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<AdminOrderListItem> getAllOrders() {
        return orderDao.findAll()
            .stream()
            .map(order -> new AdminOrderListItem(order, orderService.calculateTotalPrice(order)))
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AdminOrderDetail getOrder(@PathVariable long id) {
        Optional<Order> orderMaybe = orderDao.findById(id);
        if (orderMaybe.isPresent()) {
            Order order = orderMaybe.get();
            return new AdminOrderDetail(order, orderService.calculateTotalPrice(order));
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Order {0} not found!", id));
        }
    }

}
