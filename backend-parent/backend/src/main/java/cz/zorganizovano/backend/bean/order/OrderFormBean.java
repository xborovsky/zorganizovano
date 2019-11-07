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

}
