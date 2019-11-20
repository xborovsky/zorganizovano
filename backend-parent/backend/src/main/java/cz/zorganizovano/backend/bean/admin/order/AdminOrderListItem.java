package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.Order;
import java.util.Date;

public class AdminOrderListItem {

    private final long orderId;
    private final long orderNum;
    private final Date created;
    private final double totalPrice;
    private final Date paymentReceived;
    private final Date invoiceSent;
    private final Date shipped;

    public AdminOrderListItem(Order order, double totalPrice) {
        this.orderId = order.getId();
        this.orderNum = order.getOrderNum();
        this.created = order.getCreated();
        this.totalPrice = totalPrice;
        this.paymentReceived = order.getPaymentReceived();
        this.invoiceSent = order.getInvoiceSent();
        this.shipped = order.getShipped();
    }

    public long getOrderId() {
        return orderId;
    }

    public long getOrderNum() {
        return orderNum;
    }

    public Date getCreated() {
        return created;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public Date getPaymentReceived() {
        return paymentReceived;
    }

    public Date getInvoiceSent() {
        return invoiceSent;
    }

    public Date getShipped() {
        return shipped;
    }

}
