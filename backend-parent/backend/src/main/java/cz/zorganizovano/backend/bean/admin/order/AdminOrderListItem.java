package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.Order;
import java.util.Date;

public class AdminOrderListItem {

    private final long orderId;
    private final long orderNum;
    private final Date created;
    private final String customerName;
    private final String shipmentType;
    private final double shipmentPrice;
    private final double totalPrice;
    private final Date paymentReceived;
    private final Date readyToShip;
    private final Date invoiceSent;
    private final Date shipped;
    private final Date storno;
    private final double discountValue;

    public AdminOrderListItem(Order order, double totalPrice) {
        this.orderId = order.getId();
        this.orderNum = order.getOrderNum();
        this.created = order.getCreated();
        this.customerName = order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName();
        this.shipmentType = order.getShipmentType().getReadableName();
        this.shipmentPrice = order.getShipmentPrice();
        this.totalPrice = totalPrice;
        this.paymentReceived = order.getPaymentReceived();
        this.readyToShip = order.getReadyToShip();
        this.invoiceSent = order.getInvoiceSent();
        this.shipped = order.getShipped();
        this.storno = order.getStorno();
        this.discountValue = order.getDiscountValue();
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

    public String getCustomerName() {
        return customerName;
    }

    public String getShipmentType() {
        return shipmentType;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public Date getPaymentReceived() {
        return paymentReceived;
    }

    public Date getReadyToShip() {
        return readyToShip;
    }

    public Date getInvoiceSent() {
        return invoiceSent;
    }

    public Date getShipped() {
        return shipped;
    }

    public Date getStorno() {
        return storno;
    }

    public double getShipmentPrice() {
        return shipmentPrice;
    }

    public double getDiscountValue() {
        return discountValue;
    }

}
