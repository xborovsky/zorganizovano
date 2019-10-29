package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.payment.PaymentInfo;
import java.io.StringWriter;
import java.util.List;
import java.util.Properties;
import javax.annotation.PostConstruct;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.stereotype.Service;

@Service
public class OrderCreatedCustomerEmailImpl implements OrderCreatedCustomerEmail {
    
    private static final String TEMPLATE_FILE = "/mail-templates/order-created.customer.vm";

    private Template template;

    @PostConstruct
    public void init() {
        VelocityEngine velocityEngine = new VelocityEngine();
        Properties props = new Properties();
        props.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        props.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        velocityEngine.init(props);
        try {
            template = velocityEngine.getTemplate(TEMPLATE_FILE, "UTF-8");
        }  catch (ResourceNotFoundException|ParseErrorException e) {
            throw new IllegalStateException("Could not read email template!", e);
        }
    }

    @Override
    public String build(Order order, List<OrderItem> orderItems, PaymentInfo paymentInfo) {
        VelocityContext context = new VelocityContext();
        context.put("orderNum", order.getOrderNum());
        context.put("orderItems", buildOrderItems(order, orderItems));
        context.put("paymentDetails", buildPaymentDetails(paymentInfo));
        context.put("paymentQR", buildPaymentQR());

        StringWriter writer = new StringWriter();
        template.merge(context, writer);

        return writer.toString();
    }

    @Override
    public String getSubject() {
        return "Vaše objednávka byla přijata";
    }

    protected String buildOrderItems(Order order, List<OrderItem> orderItems) {
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

    protected String buildPaymentDetails(PaymentInfo paymentInfo) {
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

    protected String buildPaymentQR() {
        return "TODO - paymentQR";
    }

}
