package cz.zorganizovano.backend.bean.admin.order;

import cz.zorganizovano.backend.entity.ShipmentCountry;
import java.util.List;

public class DeliveryOptionsRequest {

    private List<Long> orderItemIds;
    private ShipmentCountry selectedCountry;

    public List<Long> getOrderItemIds() {
        return orderItemIds;
    }

    public void setOrderItemIds(List<Long> orderItemIds) {
        this.orderItemIds = orderItemIds;
    }

    public ShipmentCountry getSelectedCountry() {
        return selectedCountry;
    }

    public void setSelectedCountry(ShipmentCountry selectedCountry) {
        this.selectedCountry = selectedCountry;
    }

}
