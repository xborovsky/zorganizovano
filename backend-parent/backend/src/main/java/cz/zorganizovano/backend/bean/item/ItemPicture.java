package cz.zorganizovano.backend.bean.item;

import cz.zorganizovano.backend.entity.StockItemPicture;

public class ItemPicture {

    private final long stockItemPictureId;
    private final String thumbnail;
    private final String src;
    private final String srcSet;

    public ItemPicture(StockItemPicture stockItemPicture) {
        this.stockItemPictureId = stockItemPicture.getId();
        this.thumbnail = stockItemPicture.getGalleryThumbnail();
        this.src = stockItemPicture.getSrc();
        this.srcSet = stockItemPicture.getSrcSet();
    }

    public long getStockItemPictureId() {
        return stockItemPictureId;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getSrc() {
        return src;
    }

    public String getSrcSet() {
        return srcSet;
    }

}
