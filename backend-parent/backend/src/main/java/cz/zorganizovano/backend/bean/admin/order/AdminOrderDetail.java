package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.Customer;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.ShipmentAddress;
import cz.zorganizovano.backend.entity.ShipmentType;
import java.util.Date;
import java.util.List;

public class AdminOrderDetail {

    private final long orderId;
    private final long orderNum;
    private final Date created;
    private final ShipmentType shipmentType;
    private final double totalPrice;
    private final Date paymentReceived;
    private final Date invoiceSent;
    private final Date shipped;
    private final InvoiceAddress invoiceAddress;
    private final ShipmentAddress shipmentAddress;
    private final Customer customer;
    private final List<AdminOrderProductItem> orderItems;

    public AdminOrderDetail(Order order, double totalPrice, InvoiceAddress invoiceAddress, ShipmentAddress shipmentAddress, Customer customer, List<AdminOrderProductItem> orderItems) {
        this.orderId = order.getId();
        this.orderNum = order.getOrderNum();
        this.created = order.getCreated();
        this.shipmentType = order.getShipmentType();
        this.totalPrice = totalPrice;
        this.paymentReceived = order.getPaymentReceived();
        this.invoiceSent = order.getInvoiceSent();
        this.shipped = order.getShipped();
        this.invoiceAddress = invoiceAddress;
        this.shipmentAddress = shipmentAddress;
        this.customer = customer;
        this.orderItems = orderItems;
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

    public ShipmentType getShipmentType() {
        return shipmentType;
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

    public InvoiceAddress getInvoiceAddress() {
        return invoiceAddress;
    }

    public ShipmentAddress getShipmentAddress() {
        return shipmentAddress;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<AdminOrderProductItem> getOrderItems() {
        return orderItems;
    }

}
