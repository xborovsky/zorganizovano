package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.Order;
import java.util.Date;

public class AdminOrderListItem {

    private long orderId;
    private long orderNum;
    private Date created;
    private double totalPrice;
    private Date paymentReceived;
    private Date invoiceSent;
    private Date shipped;

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

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public long getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(long orderNum) {
        this.orderNum = orderNum;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getPaymentReceived() {
        return paymentReceived;
    }

    public void setPaymentReceived(Date paymentReceived) {
        this.paymentReceived = paymentReceived;
    }

    public Date getInvoiceSent() {
        return invoiceSent;
    }

    public void setInvoiceSent(Date invoiceSent) {
        this.invoiceSent = invoiceSent;
    }

    public Date getShipped() {
        return shipped;
    }

    public void setShipped(Date shipped) {
        this.shipped = shipped;
    }
    
}
