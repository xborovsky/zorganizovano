package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.util.List;

public abstract class OrderCreatedEmailBuilderAbs {

    public String buildOrderItems(Order order, List<OrderItem> orderItems) {
        double subTotal = 0;
        StringBuilder sb = new StringBuilder();
        for (OrderItem orderItem : orderItems) {
            subTotal += orderItem.getPrice() * orderItem.getQuantity();
            sb.append("<tr>")
                .append("<td>").append(orderItem.getItem().getName()).append("</td>")
                .append("<td>").append(orderItem.getQuantity()).append("</td>")
                .append("<td>").append(orderItem.getPrice() * orderItem.getQuantity()).append(",- Kč</td>")
                .append("</tr>");
        }

        sb.append("<tr>")
            .append("<td colspan=\"2\">").append("Mezisoučet:").append("</td>")
            .append("<td>").append(subTotal).append(",- Kč</td>")
            .append("</tr>");
        sb.append("<tr>")
            .append("<td colspan=\"3\">").append("Doprava").append("</td>")
            .append("</tr>");
        // TODO
        /*sb.append("<tr>")
            .append("<td colspan=\"2\">").append(order).append("</td>")
            .append("<td>").append(subTotal).append(",- Kč</td>")
            .append("</tr>");
        sb.append("<tr>")
            .append("<td colspan=\"2\">").append("Celkem k úhradě:").append("</td>")
            .append("<td>").append(total).append(",- Kč</td>")
            .append("</tr>");*/

        return sb.toString();
    }

    public String buildPaymentDetails(PaymentInfo paymentInfo) {
        StringBuilder sb = new StringBuilder();
        sb.append("<table>")
                .append("<tr>")
                    .append("<th>Číslo účtu:</th>")
                    .append("<td>")
                        .append(paymentInfo.getAccountNumber())
                        .append("/")
                        .append(paymentInfo.getBankCode())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th>Částka:</th>")
                    .append("<td>")
                        .append(paymentInfo.getAmount())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th>Variabilní symbol:</th>")
                    .append("<td>")
                        .append(paymentInfo.getVariableSymbol())
                    .append("</td>")
                .append("</tr>")
                .append("<tr>")
                    .append("<th>Datum splatnosti::</th>")
                    .append("<td>")
                        .append(paymentInfo.getDateFormatted())
                    .append("</td>")
                .append("</tr>")
            .append("</table>");

        return sb.toString();
    }

    public String buildPaymentQR() {
        return "TODO - paymentQR";
    }

}
