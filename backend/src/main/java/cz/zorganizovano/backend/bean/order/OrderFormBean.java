package cz.zorganizovano.backend.bean.order;

import javax.validation.Valid;

public class OrderFormBean {

    @Valid
    private CustomerInfo customer;
    private Address shippingAddress;
    @Valid
    private ShoppingCart shoppingCart;

    public CustomerInfo getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerInfo customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

}
