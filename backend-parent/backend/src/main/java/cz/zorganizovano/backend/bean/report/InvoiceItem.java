package cz.zorganizovano.backend.bean.report;

import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.report.InvoiceCreatorImpl;

public class InvoiceItem {

    private String productName;
    private int quantity;
    private String pricePerItem;
    private String priceTotal;
    
    public InvoiceItem(OrderItem orderItem) {
        this.productName = orderItem.getItem().getName();
        this.quantity = orderItem.getQuantity();
        this.pricePerItem = (int)orderItem.getPrice() + InvoiceCreatorImpl.PRICE_SUFFIX;
        this.priceTotal = (int)(orderItem.getPrice() * orderItem.getQuantity()) + InvoiceCreatorImpl.PRICE_SUFFIX;
    }
    
    public InvoiceItem(String productName, int quantity, String pricePerItem) {
        this.productName = productName;
        this.quantity = quantity;
        this.pricePerItem = pricePerItem;
        this.priceTotal = pricePerItem;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPricePerItem() {
        return pricePerItem;
    }

    public void setPricePerItem(String pricePerItem) {
        this.pricePerItem = pricePerItem;
    }

    public String getPriceTotal() {
        return priceTotal;
    }

    public void setPriceTotal(String priceTotal) {
        this.priceTotal = priceTotal;
    }

}
