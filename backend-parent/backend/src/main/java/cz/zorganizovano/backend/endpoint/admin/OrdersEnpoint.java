package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.order.AdminOrderListItem;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.dao.ShipmentAddressDao;
import cz.zorganizovano.backend.endpoint.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.Order;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private OrderItemDao orderItemDao;
    @Autowired
    private ShipmentAddressDao shipmentAddressDao;

    @GetMapping
    public List<AdminOrderListItem> getAllOrders() {
        List<Order> orders = orderDao.findAll();
        List<AdminOrderListItem> result = new ArrayList<>(orders.size());
        orders.forEach(order -> {
            double totalPrice = orderItemDao.getTotalOrderItemsPrice(order.getId()) +
                shipmentAddressDao.findByOrder(order).getShipmentType().getPrice();
            result.add(new AdminOrderListItem(order, totalPrice));
        });
        
        return result;
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable long id) {
        Optional<Order> orderMaybe = orderDao.findById(id);
        if (orderMaybe.isPresent()) {
            Order order = orderMaybe.get();
            return order;
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Order {0} not found!", id));
        }
    }

}
