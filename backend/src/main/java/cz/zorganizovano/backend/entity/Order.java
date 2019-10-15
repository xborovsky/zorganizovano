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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "order")
public class Order implements Serializable {
    private static final long serialVersionUID = -1344823592580387688L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;
    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @OneToOne
    @JoinColumn(name = "order_address_id", nullable = false)
    private OrderAddress orderAddress;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created")
    private Date created;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "processed")
    private Date processed;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "shipped")
    private Date shipped;
    @Enumerated(EnumType.STRING)
    private ShipmentType shipmentType;
    @OneToOne
    @JoinColumn(name = "shipment_address_id")
    private ShipmentAddress shipmentAddress;
    
    public Order() {}
    
    public Order(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public OrderAddress getOrderAddress() {
        return orderAddress;
    }

    public void setOrderAddress(OrderAddress orderAddress) {
        this.orderAddress = orderAddress;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getProcessed() {
        return processed;
    }

    public void setProcessed(Date processed) {
        this.processed = processed;
    }

    public Date getShipped() {
        return shipped;
    }

    public void setShipped(Date shipped) {
        this.shipped = shipped;
    }

    public ShipmentType getShipmentType() {
        return shipmentType;
    }

    public void setShipmentType(ShipmentType shipmentType) {
        this.shipmentType = shipmentType;
    }

    public ShipmentAddress getShipmentAddress() {
        return shipmentAddress;
    }

    public void setShipmentAddress(ShipmentAddress shipmentAddress) {
        this.shipmentAddress = shipmentAddress;
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
