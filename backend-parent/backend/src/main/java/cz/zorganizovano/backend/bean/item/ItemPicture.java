package cz.zorganizovano.backend.bean.item;

import cz.zorganizovano.backend.entity.StockItemPicture;

public class ItemPicture {

    private final long stockItemPictureId;
    private final String src;

    public ItemPicture(StockItemPicture stockItemPicture) {
        this.stockItemPictureId = stockItemPicture.getId();
        this.src = stockItemPicture.getSrc();
    }

    public long getStockItemPictureId() {
        return stockItemPictureId;
    }

    public String getSrc() {
        return src;
    }

}
