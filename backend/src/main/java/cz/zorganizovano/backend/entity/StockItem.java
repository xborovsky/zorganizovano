package cz.zorganizovano.backend.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "stock_items")
public class StockItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @OneToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
    @Column(name = "quantity", nullable = false)
    private int quantity = 0;
    @Column(name = "display_on_eshop", nullable = false)
    private boolean displayOnEshop = false;

    public StockItem() {}

    public StockItem(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isDisplayOnEshop() {
        return displayOnEshop;
    }

    public void setDisplayOnEshop(boolean displayOnEshop) {
        this.displayOnEshop = displayOnEshop;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + (int) (this.id ^ (this.id >>> 32));
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final StockItem other = (StockItem) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "StockItem{" + "id=" + id + ", item=" + item + ", quantity=" + quantity + ", displayOnEshop=" + displayOnEshop + '}';
    }

}
