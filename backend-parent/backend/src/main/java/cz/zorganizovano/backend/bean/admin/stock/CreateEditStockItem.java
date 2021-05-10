package cz.zorganizovano.backend.bean.admin.stock;

import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CreateEditStockItem {

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

    public static class ItemPicture {

        private long id;
        private String src;
        private boolean main;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getSrc() {
            return src;
        }

        public void setSrc(String src) {
            this.src = src;
        }

        public boolean isMain() {
            return main;
        }

        public void setMain(boolean main) {
            this.main = main;
        }

        @Override
        public String toString() {
            return "ItemPicture{" + "id=" + id + ", src=" + src + ", main=" + main + '}';
        }

    }

    @NotBlank(message = "Pole Název je povinné")
    @Size(max = 100, message = "Pole Název je omezeno na 100 znaků")
    private String name;
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
    private boolean enableOnlineShipment;
    private List<ItemDetail> details;
    @NotBlank(message = "Pole Cloudinary název obrázku pro náhled je povinné")
    private String thumbnailLocation;
    private List<ItemPicture> pictures;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public boolean isEnableOnlineShipment() {
        return enableOnlineShipment;
    }

    public void setEnableOnlineShipment(boolean enableOnlineShipment) {
        this.enableOnlineShipment = enableOnlineShipment;
    }

    public List<ItemDetail> getDetails() {
        return details;
    }

    public void setDetails(List<ItemDetail> details) {
        this.details = details;
    }

    public String getThumbnailLocation() {
        return thumbnailLocation;
    }

    public void setThumbnailLocation(String thumbnailLocation) {
        this.thumbnailLocation = thumbnailLocation;
    }

    public List<ItemPicture> getPictures() {
        return pictures;
    }

    public void setPictures(List<ItemPicture> pictures) {
        this.pictures = pictures;
    }

    @Override
    public String toString() {
        return "CreateStockItem{" + "name=" + name + ", subName=" + subName + ", description=" + description
                + ", price=" + price + ", metaTitle=" + metaTitle + ", category=" + category
                + ", enableOnlineShipment=" + enableOnlineShipment + ", details=" + details
                + ", thumbnailLocation=" + thumbnailLocation + ", pictures=" + pictures + '}';
    }

}
