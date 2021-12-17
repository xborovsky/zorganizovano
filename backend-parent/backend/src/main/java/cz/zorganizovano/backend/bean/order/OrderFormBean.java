package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.entity.ShipmentType;
import javax.validation.Valid;

public class OrderFormBean {

    @Valid
    private CustomerInfo customerInfo;
    private AddressDTO shippingAddress;
    private ShipmentType shipmentType;
    @Valid
    private ShoppingCart shoppingCart;
    private String discountCode;
    private String note;

    public CustomerInfo getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(CustomerInfo customerInfo) {
        this.customerInfo = customerInfo;
    }

    public AddressDTO getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressDTO shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public ShipmentType getShipmentType() {
        return shipmentType;
    }

    public void setShipmentType(ShipmentType shipmentType) {
        this.shipmentType = shipmentType;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "OrderFormBean{" + "customerInfo=" + customerInfo + ", shippingAddress=" + shippingAddress + ", shipmentType=" + shipmentType + ", shoppingCart=" + shoppingCart + ", discountCode=" + discountCode + '}';
    }

}
