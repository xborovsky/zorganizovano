package cz.zorganizovano.backend.bean.admin.report;

public class ProductsByYearReportData {

    private long itemId;
    private String itemName;
    private long quantity;
    
    public ProductsByYearReportData() {}
    
    public ProductsByYearReportData(long itemId, String itemName, long quantity) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantity = quantity;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
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
