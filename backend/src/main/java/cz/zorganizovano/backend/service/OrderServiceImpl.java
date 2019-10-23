package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.bean.order.Address;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.bean.order.ShoppingCart;
import cz.zorganizovano.backend.dao.CustomerDao;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.entity.Customer;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.InvoiceAddress;
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

    @Override
    @Transactional
    public Order createOrder(CustomerInfo customerInfo, Address shippingAddress, ShoppingCart shoppingCart) {
        Date now = timeManager.getCurrentDate();
        Order order = new Order();
        order.setCreated(now);
        order.setOrderNum(genereateOrderNumber(now));

        Customer customer = new Customer();
        customer.setFirstName(customerInfo.getFirstName());
        customer.setLastName(customerInfo.getLastName());
        customer.setEmail(customerInfo.getEmail());
        customer.setPhoneNo(customerInfo.getPhoneNo());

        customerDao.save(customer);

        order.setCustomer(customer);

        orderDao.save(order);

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
}
