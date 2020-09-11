package cz.zorganizovano.backend.report;

import java.util.List;

public class OrderReportFormData {

    private List<Long> orderIds;

    public List<Long> getOrderIds() {
        return orderIds;
    }

    public void setOrderIds(List<Long> orderIds) {
        this.orderIds = orderIds;
    }

}
