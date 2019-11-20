package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.order.AdminOrderDetail;
import cz.zorganizovano.backend.bean.admin.order.AdminOrderListItem;
import cz.zorganizovano.backend.bean.admin.order.AdminOrderProductItem;
import cz.zorganizovano.backend.dao.InvoiceAddressDao;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.dao.ShipmentAddressDao;
import cz.zorganizovano.backend.endpoint.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.ShipmentAddress;
import cz.zorganizovano.backend.service.OrderService;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/orders")
public class OrdersEnpoint {
    private static final Logger LOG = LoggerFactory.getLogger(OrdersEnpoint.class);

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderService orderService;
    @Autowired
    private InvoiceAddressDao invoiceAddressDao;
    @Autowired
    private ShipmentAddressDao shipmentAddressDao;
    @Autowired
    private OrderItemDao orderItemDao;

    @GetMapping
    public List<AdminOrderListItem> getAllOrders() {
        return orderDao.findNotShipped()
            .stream()
            .map(order -> new AdminOrderListItem(order, orderService.calculateTotalPrice(order)))
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AdminOrderDetail getOrder(@PathVariable long id) {
        Optional<Order> orderMaybe = orderDao.findById(id);
        if (orderMaybe.isPresent()) {
            Order order = orderMaybe.get();
            InvoiceAddress invoiceAddress = invoiceAddressDao.findByOrder(order);
            Optional<ShipmentAddress> shipmentAddressMaybe = shipmentAddressDao.findByOrder(order);
            List<AdminOrderProductItem> orderItems = orderItemDao.findByOrder(order)
                    .stream()
                    .map(item -> new AdminOrderProductItem(item))
                    .collect(Collectors.toList());

            return new AdminOrderDetail(
                order,
                orderService.calculateTotalPrice(order),
                invoiceAddress,
                shipmentAddressMaybe.orElse(null),
                invoiceAddress.getOrder().getCustomer(),
                orderItems
            );
        } else {
            throw new ResourceNotFoundException(MessageFormat.format("Order {0} not found!", id));
        }
    }

    @PostMapping("/{id}/{dateProperty}")
    public Date udpateDate(@PathVariable long id, @PathVariable String dateProperty) {
        Optional<Order> orderMaybe = orderDao.findById(id);
        if (!orderMaybe.isPresent()) {
            throw new ResourceNotFoundException(MessageFormat.format("Order {0} not found!", id));
        }

        Order order = orderMaybe.get();
        switch(dateProperty) {
            case "paymentReceived":
                return orderService.updatePaymentReceivedDate(order);
            case "invoiceSent":
                return orderService.updateInvoiceSentDate(order);
            case "shipped":
                return orderService.updateShippedDate(order);
            default:
                LOG.warn(MessageFormat.format("Unknown property {0}!", dateProperty));
        }
        return null;
    }

}
