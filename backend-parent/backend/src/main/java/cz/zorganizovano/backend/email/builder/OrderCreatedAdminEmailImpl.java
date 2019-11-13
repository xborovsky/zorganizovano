package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.order.AddressDTO;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentType;
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
public class OrderCreatedAdminEmailImpl extends OrderCreatedEmailBuilderAbs implements OrderCreatedAdminEmail {

    private static final String TEMPLATE_FILE = "/mail-templates/order-created.admin.vm";

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
    public String build(Order order, List<OrderItem> orderItems, ShipmentType shipmentType,
            AddressDTO shippingAddress, CustomerInfo customerInfo) {
        VelocityContext context = new VelocityContext();
        context.put("orderNum", order.getOrderNum());
        context.put("orderItems", buildOrderItems(order, orderItems, shipmentType, shippingAddress));
        context.put("shippingAddress", buildShipmentAddress(shipmentType, shippingAddress));
        context.put("customerInfo", buildCustomerInfo(customerInfo));

        StringWriter writer = new StringWriter();
        template.merge(context, writer);

        return writer.toString();
    }

    @Override
    public String getSubject() {
        return "Nová objednávka přijata!";
    }
    
    protected String buildCustomerInfo(CustomerInfo customerInfo) {
        StringBuilder sb = new StringBuilder("");
        sb.append("<strong>Zákazník:</strong><br />")
            .append(customerInfo.getFirstName()).append(" ")
            .append(customerInfo.getLastName()).append("<br />")
            .append(customerInfo.getEmail()).append("<br />")
            .append(customerInfo.getPhoneNo()).append("<br />")
            .append(customerInfo.getAddress().getStreet()).append("<br />")
            .append(customerInfo.getAddress().getTownship()).append("<br />")
            .append(customerInfo.getAddress().getZipCode()).append("<br />")
            .append(customerInfo.getAddress().getCountry());

        return sb.toString();
    }

}
