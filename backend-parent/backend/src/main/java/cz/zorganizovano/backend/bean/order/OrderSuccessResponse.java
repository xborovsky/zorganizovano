package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.payment.PaymentInfo;

public class OrderSuccessResponse {

    private long orderNum;
    private PaymentInfo paymentInfo;

    public OrderSuccessResponse(long orderNum, PaymentInfo paymentInfo) {
        this.orderNum = orderNum;
        this.paymentInfo = paymentInfo;
    }

    public long getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(long orderNum) {
        this.orderNum = orderNum;
    }

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

}
