package cz.zorganizovano.backend.bean.admin.stock;

import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CreateStockItemMultiple {

    public static class ItemDetail {

        private long id;
        private String key;
        private String value;
        private int priorityOrder;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public int getPriorityOrder() {
            return priorityOrder;
        }

        public void setPriorityOrder(int priorityOrder) {
            this.priorityOrder = priorityOrder;
        }

        @Override
        public String toString() {
            return "ItemDetail{" + "id=" + id + ", key=" + key + ", value=" + value + ", priorityOrder=" + priorityOrder + '}';
        }

    }

    private List<String> names;
    @NotBlank(message = "Pole Podnázev je povinné")
    @Size(max = 200, message = "Pole Podnázev je omezeno na 200 znaků")
    private String subName;
    @NotBlank(message = "Pole Popis je povinné")
    private String description;
    @Min(value = 1, message = "Pole Cena musí být kladné")
    private double price;
    @NotBlank(message = "Pole SEO popisek je povinné")
    private String metaTitle;
    private long category;
    private String newSubcategories;
    private List<ItemDetail> details;
    private String imageNamePrefix;
    private String imageNameSuffix;
    @Min(value = 0, message = "Počet kusů musí být nezáporný")
    private int quantity;

    public List<String> getNames() {
        return names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public String getSubName() {
        return subName;
    }

    public void setSubName(String subName) {
        this.subName = subName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public long getCategory() {
        return category;
    }

    public void setCategory(long category) {
        this.category = category;
    }

    public String getNewSubcategories() {
        return newSubcategories;
    }

    public void setNewSubcategories(String newSubcategories) {
        this.newSubcategories = newSubcategories;
    }

    public List<ItemDetail> getDetails() {
        return details;
    }

    public void setDetails(List<ItemDetail> details) {
        this.details = details;
    }

    public String getImageNamePrefix() {
        return imageNamePrefix;
    }

    public void setImageNamePrefix(String imageNamePrefix) {
        this.imageNamePrefix = imageNamePrefix;
    }

    public String getImageNameSuffix() {
        return imageNameSuffix;
    }

    public void setImageNameSuffix(String imageNameSuffix) {
        this.imageNameSuffix = imageNameSuffix;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CreateStockItemMultiple{" + "names=" + names + ", subName=" + subName + ", description=" + description
                + ", price=" + price + ", metaTitle=" + metaTitle + ", category=" + category + ", newSubcategories=" + newSubcategories
                + ", details=" + details + ", imageNamePrefix=" + imageNamePrefix + ", imageNameSuffix=" + imageNameSuffix + ", quantity=" + quantity + '}';
    }

}
