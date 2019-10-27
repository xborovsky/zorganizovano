package cz.zorganizovano.backend.bean.item;

public class ItemPicture {

    private final String pictureBase64;
    private final String dataType;
    
    public ItemPicture(String pictureBase64, String dataType) {
        this.pictureBase64 = pictureBase64;
        this.dataType = dataType;
    }

    public String getPictureBase64() {
        return pictureBase64;
    }

    public String getDataType() {
        return dataType;
    }
    
    
    
}
