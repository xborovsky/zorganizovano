package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.OrderCreatedDTO;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.bean.order.ShoppingCartItem;
import cz.zorganizovano.backend.dao.CustomerDao;
import cz.zorganizovano.backend.dao.InvoiceAddressDao;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.dao.ShipmentAddressDao;
import cz.zorganizovano.backend.dao.StockItemDao;
import cz.zorganizovano.backend.entity.Customer;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentAddress;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.entity.StockItem;
import cz.zorganizovano.backend.manager.TimeManager;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
    // TODO refaktor to smaller services (OrderItemService, StockItemService, etc...)

    @Autowired
    private TimeManager timeManager;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private InvoiceAddressDao invoiceAddressDao;
    @Autowired
    private ShipmentAddressDao shipmentAddressDao;
    @Autowired
    private StockItemDao stockItemDao;
    @Autowired
    private OrderItemDao orderItemDao;
    

    @Override
    @Transactional
    public OrderCreatedDTO createOrder(CustomerInfo customerInfo, AddressDTO shippingAddress, ShoppingCart shoppingCart) {
        Date now = timeManager.getCurrentDate();
        Order order = new Order();
        order.setCreated(now);
        order.setMaturity(timeManager.getNextDate(DEFAULT_MATURITY));
        order.setOrderNum(genereateOrderNumber(now));

        Customer customer = createCustomer(customerInfo);
        order.setCustomer(customer);

        order = orderDao.save(order);

        List<OrderItem> orderItems = createOrderItems(shoppingCart, order);
        InvoiceAddress invoiceAddress = createInvoiceAddress(customerInfo, order);
        ShipmentAddress shipmentAddress = null;
        if (shippingAddress != null) {
            shipmentAddress = createShipmentAddress(shippingAddress, order);
        }


        return new OrderCreatedDTO(
            order, 
            orderItems, 
            getShippingAddress(invoiceAddress, shipmentAddress),
            orderItems.stream()
                .map(orderItem -> orderItem.getPrice() * orderItem.getQuantity())
                .reduce(0.0, Double::sum)
        );
    }

    protected long genereateOrderNumber(Date now) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);

        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        StringBuilder sb = new StringBuilder();
        sb.append(year);
        sb.append(String.format("%02d", month));
        sb.append(String.format("%02d", day));

        long todayOrdersCnt = orderDao.countTodayOrders();
        if (todayOrdersCnt % 1000 == 999) {
            throw new IllegalStateException("Orders limit reached!");
        }
        sb.append(String.format("%03d", todayOrdersCnt + 1));

        return Long.parseLong(sb.toString());
    }

    protected List<OrderItem> createOrderItems(ShoppingCart shoppingCart, Order order) {
        List<OrderItem> orderItems = new ArrayList<>(shoppingCart.getItems().size());

        for (ShoppingCartItem shoppingCartItem : shoppingCart.getItems()) {
            StockItem stockItem = stockItemDao.findById(shoppingCartItem.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException(MessageFormat.format("Item id={0} not found on stock!", shoppingCartItem.getItemId())));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setPrice(stockItem.getItem().getPrice());
            orderItem.setQuantity(shoppingCartItem.getQuantity());
            orderItem.setItem(stockItem.getItem());
            orderItems.add(orderItemDao.save(orderItem));

            updateStock(stockItem, shoppingCartItem);
        }

        return orderItems;
    }

    protected Customer createCustomer(CustomerInfo customerInfo) {
        Customer customer = new Customer();
        customer.setFirstName(customerInfo.getFirstName());
        customer.setLastName(customerInfo.getLastName());
        customer.setEmail(customerInfo.getEmail());
        customer.setPhoneNo(customerInfo.getPhoneNo());

        customerDao.save(customer);

        return customer;
    }

    protected InvoiceAddress createInvoiceAddress(CustomerInfo customerInfo, Order order) {
        InvoiceAddress invoiceAddress = new InvoiceAddress();
        invoiceAddress.setStreet(customerInfo.getAddress().getStreet());
        invoiceAddress.setTownship(customerInfo.getAddress().getTownship());
        invoiceAddress.setZipCode(customerInfo.getAddress().getZipCode());
        invoiceAddress.setCountry(customerInfo.getAddress().getCountry());
        invoiceAddress.setOrder(order);

        return invoiceAddressDao.save(invoiceAddress);
    }

    protected ShipmentAddress createShipmentAddress(AddressDTO address, Order order) {
        ShipmentAddress shipmentAddress = new ShipmentAddress();
        shipmentAddress.setStreet(address.getStreet());
        shipmentAddress.setTownship(address.getTownship());
        shipmentAddress.setZipCode(address.getZipCode());
        shipmentAddress.setCountry(address.getCountry());
        shipmentAddress.setShipmentType(ShipmentType.ZASILKOVNA);// TODO
        shipmentAddress.setOrder(order);

        return shipmentAddressDao.save(shipmentAddress);
    }

    protected void updateStock(StockItem stockItem, ShoppingCartItem shoppingCartItem) {
        if (stockItem.getQuantity() < shoppingCartItem.getQuantity()) {
            throw new IllegalStateException(
                MessageFormat.format(
                    "Not available quantity in stock form item id={0}! Stock quantity={1}, requested quantity={2}",
                    stockItem.getId(), stockItem.getQuantity(), shoppingCartItem.getQuantity()
                )
            );
        }

        stockItem.setQuantity(stockItem.getQuantity() - shoppingCartItem.getQuantity());
        stockItemDao.save(stockItem);
    }
    
    protected AddressDTO getShippingAddress(InvoiceAddress invoiceAddress, ShipmentAddress shipmentAddress) {
        if (shipmentAddress == null) {
            return new AddressDTO(
                invoiceAddress.getStreet(),
                invoiceAddress.getTownship(),
                invoiceAddress.getZipCode(),
                invoiceAddress.getCountry()
            );
        } else {
            return new AddressDTO(
                shipmentAddress.getStreet(),
                shipmentAddress.getTownship(),
                shipmentAddress.getZipCode(),
                shipmentAddress.getCountry()
            );
        }
    }
}
