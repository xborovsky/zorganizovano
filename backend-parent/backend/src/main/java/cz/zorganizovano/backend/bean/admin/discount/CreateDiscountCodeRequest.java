package cz.zorganizovano.backend.bean.admin.discount;

import java.util.Date;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public class CreateDiscountCodeRequest {

    @Min(1)
    private int discount;
    @NotBlank(message = "Kód je povinný.")
    @Length(max = 20, message = "Kód je omezený na 20 znaků.")
    private String code;
    private Date validUntil;
    private boolean percentage;
    private boolean oneTime;

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public boolean isPercentage() {
        return percentage;
    }

    public void setPercentage(boolean percentage) {
        this.percentage = percentage;
    }

    public boolean isOneTime() {
        return oneTime;
    }

    public void setOneTime(boolean oneTime) {
        this.oneTime = oneTime;
    }

}
