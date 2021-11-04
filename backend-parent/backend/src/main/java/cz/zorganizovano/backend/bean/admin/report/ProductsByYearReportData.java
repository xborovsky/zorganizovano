package cz.zorganizovano.backend.bean.admin.report;

public class ProductsByYearReportData {

    private String itemName;
    private long quantity;
    
    public ProductsByYearReportData() {}
    
    public ProductsByYearReportData(String itemName, long quantity) {
        this.itemName = itemName;
        this.quantity = quantity;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

}
