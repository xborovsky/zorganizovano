package cz.zorganizovano.backend.service;

import com.google.common.base.Joiner;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import cz.zorganizovano.backend.dao.InvoiceAddressDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.dao.ShipmentAddressDao;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import cz.zorganizovano.backend.entity.ShipmentAddress;
import cz.zorganizovano.backend.report.OrderReportItem;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderReportServiceImpl implements OrderReportService {
    
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ShipmentAddressDao shipmentAddressDao;
    @Autowired
    private InvoiceAddressDao invoiceAddressDao;
    
    @Override
    public ByteArrayInputStream generateReport(List<Order> orders) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        Table table = new Table(2).useAllAvailableWidth();
        addRows(table, orders);
        document.add(table);

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
    
    private void addRows(Table table, List<Order> orders) throws IOException {
        for (Order order : orders) {
            List<OrderItem> orderItems = orderItemDao.findByOrder(order);
            double totalPrice = orderService.calculateTotalPrice(order);
            OrderReportItem orderReportItem = new OrderReportItem(order, orderItems, totalPrice, getShipmentAddress(order));

            table.addCell(orderReportItem.buildForReport());
        }
    }
    
    private String getShipmentAddress(Order order) {
        ShipmentAddress shipmentAddress = shipmentAddressDao.findByOrder(order).orElse(null);
        if (shipmentAddress != null) {
            return Joiner.on(", ").join(
                shipmentAddress.getStreet(),
                shipmentAddress.getTownship(),
                shipmentAddress.getZipCode(),
                shipmentAddress.getCountry()
            );
        }
        
        InvoiceAddress invoiceAddress = invoiceAddressDao.findByOrder(order);
        if (invoiceAddress != null) {
            return Joiner.on(", ").join(
                invoiceAddress.getStreet(),
                invoiceAddress.getTownship(),
                invoiceAddress.getZipCode(),
                invoiceAddress.getCountry()
            );
        }
        
        return "";
    }

}
