package cz.zorganizovano.backend.bean.item;

public class ItemPicture {

    private final long stockItemPictureId;
    private final String thumbnail;
    private final String src;
    private final String srcSet;

    public ItemPicture(long stockItemPictureId, String thumbnail, String src, String srcSet) {
        this.stockItemPictureId = stockItemPictureId;
        this.thumbnail = thumbnail;
        this.src = src;
        this.srcSet = srcSet;
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
