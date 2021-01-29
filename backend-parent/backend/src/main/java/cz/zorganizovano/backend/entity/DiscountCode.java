package cz.zorganizovano.backend.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "discount_codes")
public class DiscountCode implements Serializable {

    private static final long serialVersionUID = -4322985895185481828L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "code", nullable = false, unique = true)
    private String code;
    @Column(name = "discount", nullable = false)
    private int discount;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "valid_until", nullable = true)
    private Date validUntil;
    @Column(name = "one_time", nullable = false)
    private boolean oneTime = false;
    @Column(name = "used", nullable = true)
    private Boolean used;
    @Column(name = "percentage", nullable = false)
    private boolean percentage = false;

    public DiscountCode() {
    }

    public DiscountCode(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public boolean isOneTime() {
        return oneTime;
    }

    public void setOneTime(boolean oneTime) {
        this.oneTime = oneTime;
    }

    public Boolean isUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public boolean isPercentage() {
        return percentage;
    }

    public void setPercentage(boolean percentage) {
        this.percentage = percentage;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + (int) (this.id ^ (this.id >>> 32));
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
        final DiscountCode other = (DiscountCode) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DiscountCode{" + "id=" + id + ", code=" + code + ", discount=" + discount
                + ", validUntil=" + validUntil + ", oneTime=" + oneTime + ", used=" + used
                + ", percentage=" + percentage + '}';
    }
}
