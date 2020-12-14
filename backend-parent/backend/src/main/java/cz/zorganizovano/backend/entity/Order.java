package cz.zorganizovano.backend.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

    private static final long serialVersionUID = -1344823592580387688L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "order_num", nullable = false, unique = true)
    private long orderNum;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", nullable = false)
    private Date created;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "maturity", nullable = false)
    private Date maturity;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "payment_received")
    private Date paymentReceived;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ready_to_ship")
    private Date readyToShip;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "invoice_sent")
    private Date invoiceSent;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "shipped")
    private Date shipped;
    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @Enumerated(EnumType.STRING)
    private ShipmentType shipmentType;
    @Column(name = "shipment_price", nullable = false)
    private double shipmentPrice;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "storno")
    private Date storno;
    @ManyToOne
    @JoinColumn(name = "discount_code_id")
    private DiscountCode discountCode;
    @Column(name = "discount_value")
    private double discountValue;
    @Column(name = "trackingNumber")
    private String trackingNumber;

    public Order() {
    }

    public Order(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Date getMaturity() {
        return maturity;
    }

    public void setMaturity(Date maturity) {
        this.maturity = maturity;
    }

    public Date getShipped() {
        return shipped;
    }

    public void setShipped(Date shipped) {
        this.shipped = shipped;
    }

    public Date getPaymentReceived() {
        return paymentReceived;
    }

    public void setPaymentReceived(Date paymentReceived) {
        this.paymentReceived = paymentReceived;
    }

    public Date getReadyToShip() {
        return readyToShip;
    }

    public void setReadyToShip(Date readyToShip) {
        this.readyToShip = readyToShip;
    }

    public Date getInvoiceSent() {
        return invoiceSent;
    }

    public void setInvoiceSent(Date invoiceSent) {
        this.invoiceSent = invoiceSent;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ShipmentType getShipmentType() {
        return shipmentType;
    }

    public void setShipmentType(ShipmentType shipmentType) {
        this.shipmentType = shipmentType;
    }

    public double getShipmentPrice() {
        return shipmentPrice;
    }

    public void setShipmentPrice(double shipmentPrice) {
        this.shipmentPrice = shipmentPrice;
    }

    public Date getStorno() {
        return storno;
    }

    public void setStorno(Date storno) {
        this.storno = storno;
    }

    public DiscountCode getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(DiscountCode discountCode) {
        this.discountCode = discountCode;
    }

    public double getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(double discountValue) {
        this.discountValue = discountValue;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + (int) (this.id ^ (this.id >>> 32));
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Order other = (Order) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Order{" + "id=" + id + '}';
    }

}
