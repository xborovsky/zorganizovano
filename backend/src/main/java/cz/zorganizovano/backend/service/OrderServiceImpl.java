package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.Address;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.dao.CustomerDao;
import cz.zorganizovano.backend.dao.InvoiceAddressDao;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.ShipmentAddressDao;
import cz.zorganizovano.backend.entity.Customer;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.ShipmentAddress;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.manager.TimeManager;
import java.util.Calendar;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

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

    @Override
    @Transactional
    public Order createOrder(CustomerInfo customerInfo, Address shippingAddress, ShoppingCart shoppingCart) {
        Date now = timeManager.getCurrentDate();
        Order order = new Order();
        order.setCreated(now);
        order.setMaturity(timeManager.getNextDate(DEFAULT_MATURITY));
        order.setOrderNum(genereateOrderNumber(now));

        Customer customer = createCustomer(customerInfo);
        order.setCustomer(customer);

        order = orderDao.save(order);

        createInvoiceAddress(customerInfo, order);
        createShipmentAddress(shippingAddress, order);

        return order;
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
        
        long todayOrdersCnt = orderDao.findByCreated(now).size();
        if (todayOrdersCnt % 1000 == 999) {
            throw new IllegalStateException("Orders limit reached!");
        }
        sb.append(String.format("%03d", todayOrdersCnt + 1));

        return Long.parseLong(sb.toString());
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

    protected ShipmentAddress createShipmentAddress(Address address, Order order) {
        ShipmentAddress shipmentAddress = new ShipmentAddress();
        shipmentAddress.setStreet(address.getStreet());
        shipmentAddress.setTownship(address.getTownship());
        shipmentAddress.setZipCode(address.getZipCode());
        shipmentAddress.setCountry(address.getCountry());
        shipmentAddress.setShipmentType(ShipmentType.ZASILKOVNA);// TODO
        shipmentAddress.setOrder(order);

        return shipmentAddressDao.save(shipmentAddress);
    }
}
