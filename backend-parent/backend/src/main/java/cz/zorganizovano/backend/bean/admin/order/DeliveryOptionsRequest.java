package cz.zorganizovano.backend.bean.admin.order;

import java.util.List;

public class DeliveryOptionsRequest {

    private List<Long> orderItemIds;

    public List<Long> getOrderItemIds() {
        return orderItemIds;
    }

    public void setOrderItemIds(List<Long> orderItemIds) {
        this.orderItemIds = orderItemIds;
    }

}
