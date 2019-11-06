package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentType;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;

public abstract class OrderCreatedEmailBuilderAbs {

    public String buildOrderItems(Order order, List<OrderItem> orderItems, ShipmentType shipmentType, AddressDTO shippingAddress) {
        double subTotal = 0;
        StringBuilder sb = new StringBuilder();
        for (OrderItem orderItem : orderItems) {
            subTotal += orderItem.getPrice() * orderItem.getQuantity();
            sb.append("<tr>")
                .append("<td style=\"border-bottom : 1px solid #999;\">").append(orderItem.getItem().getName()).append("</td>")
                .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">").append(orderItem.getQuantity()).append("</td>")
                .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">").append(orderItem.getPrice() * orderItem.getQuantity()).append(",- Kč</td>")
                .append("</tr>");
        }

        sb.append("<tr>")
            .append("<td style=\"border-bottom : 1px solid #999;\" colspan=\"2\">").append("Mezisoučet:").append("</td>")
            .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">").append(subTotal).append(",- Kč</td>")
            .append("</tr>");
        sb.append("<tr>")
            .append("<td style=\"border-bottom : 1px solid #999;\" colspan=\"2\">").append("Doprava - ").append(shipmentType.getReadableName()).append("</td>")
            .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">").append(shipmentType.getPrice()).append(",- Kč</td>")
            .append("</tr>");
        sb.append("<tr>")
            .append("<td style=\"border-bottom : 1px solid #999;\" colspan=\"2\">").append("Celkem k úhradě:").append("</td>")
            .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\"><b>").append(subTotal + shipmentType.getPrice()).append(",- Kč</b></td>")
            .append("</tr>");

        return sb.toString();
    }

    public String buildPaymentDetails(PaymentInfo paymentInfo) {
        StringBuilder sb = new StringBuilder();
        sb.append("<table cellpadding=\"10\" cellspacing=\"0\" style=\"border : 2px solid #999; border-collapse: collapse;\">")
                .append("<tr>")
                    .append("<th style=\"text-align: left; border : 1px solid #999;\">Číslo účtu:</th>")
                    .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">")
                        .append(paymentInfo.getAccountNumber())
                        .append("/")
                        .append(paymentInfo.getBankCode())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th style=\"text-align: left; border : 1px solid #999;\">Částka:</th>")
                    .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">")
                        .append(paymentInfo.getAmount())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th style=\"text-align: left; border : 1px solid #999;\">Variabilní symbol:</th>")
                    .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">")
                        .append(paymentInfo.getVariableSymbol())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th style=\"text-align: left; border : 1px solid #999;\">Datum splatnosti:</th>")
                    .append("<td style=\"text-align: right; border-bottom : 1px solid #999;\">")
                        .append(paymentInfo.getDateFormatted())
                    .append("</td>")
                .append("</tr>")
            .append("</table>");

        return sb.toString();
    }
    
    public String buildShipmentAddress(ShipmentType shipmentType, AddressDTO address) {
        return new StringBuilder()
            .append("<b>").append(shipmentType.getReadableName()).append("</b><br />")
            .append(address.getStreet()).append("<br />")
            .append(address.getTownship()).append("<br />")
            .append(address.getZipCode()).append("<br />")
            .append(address.getCountry())
            .toString();
    }

    public String buildPaymentQR() {
        return "TODO - paymentQR";
    }

}
