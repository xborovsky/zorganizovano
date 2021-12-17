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
    private final Date readyToShip;
    private final Date storno;
    private final InvoiceAddress invoiceAddress;
    private final ShipmentAddress shipmentAddress;
    private final Customer customer;
    private final List<AdminOrderProductItem> orderItems;
    private final double discountValue;
    private final String discountCode;
    private final String customerNote;
    private final String adminNote;

    public AdminOrderDetail(Order order, double totalPrice, InvoiceAddress invoiceAddress, ShipmentAddress shipmentAddress, Customer customer, List<AdminOrderProductItem> orderItems) {
        this.orderId = order.getId();
        this.orderNum = order.getOrderNum();
        this.created = order.getCreated();
        this.shipmentType = order.getShipmentType();
        this.totalPrice = totalPrice;
        this.paymentReceived = order.getPaymentReceived();
        this.invoiceSent = order.getInvoiceSent();
        this.shipped = order.getShipped();
        this.readyToShip = order.getReadyToShip();
        this.storno = order.getStorno();
        this.invoiceAddress = invoiceAddress;
        this.shipmentAddress = shipmentAddress;
        this.customer = customer;
        this.orderItems = orderItems;
        this.discountValue = order.getDiscountValue();
        this.discountCode = order.getDiscountCode() == null ? null : order.getDiscountCode().getCode();
        this.customerNote = order.getCustomerNote();
        this.adminNote = order.getAdminNote();
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

    public double getDiscountValue() {
        return discountValue;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public Date getReadyToShip() {
        return readyToShip;
    }

    public Date getStorno() {
        return storno;
    }

    public String getCustomerNote() {
        return customerNote;
    }

    public String getAdminNote() {
        return adminNote;
    }

}
