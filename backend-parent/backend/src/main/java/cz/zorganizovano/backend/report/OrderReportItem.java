package cz.zorganizovano.backend.report;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Text;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.io.IOException;
import java.util.List;
import org.springframework.core.io.ClassPathResource;

public class OrderReportItem {

    private final Order order;
    private final List<OrderItem> orderItems;
    private final double totalPrice;
    private final String address;

    public OrderReportItem(Order order, List<OrderItem> orderItems, double totalPrice, String address) {
        this.order = order;
        this.orderItems = orderItems;
        this.totalPrice = totalPrice;
        this.address = address;
    }
    
    public Table buildForReport() throws IOException {
        PdfFont font = getFont();
        Table table = new Table(2).useAllAvailableWidth();
        table.addCell(buildLeftColumn(order, orderItems, font));
        table.addCell(buildRightColumn(order, font));
        
        return table;
    }
    
    private Cell buildLeftColumn(Order order, List<OrderItem> orderItems, PdfFont font) {
        Cell cell = new Cell().setBorder(Border.NO_BORDER);
        cell.add(new Paragraph(Long.toString(order.getOrderNum())).setFont(font).setBold().setFontSize(10));
        
        orderItems.stream().forEach(orderItem -> {
            cell.add(new Paragraph(orderItem.getQuantity() + "ks " + orderItem.getItem().getName() + " (" + (int)(orderItem.getPrice() * orderItem.getQuantity()) + ",-)").setFont(font).setFontSize(8));
        });
        cell.add(new Paragraph(order.getShipmentType().getReadableName()).setFont(font).setBold()).setFontSize(10);
        cell.add(new Paragraph(new Text("\n")));

        return cell;
    }
    
    private Cell buildRightColumn(Order order, PdfFont font) throws IOException {
        Cell cell = new Cell().setBorder(Border.NO_BORDER);
        cell.add(new Paragraph((int)totalPrice + ",- Kč").setFont(font).setBold().setFontSize(10));
        cell.add(new Paragraph(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName()).setFont(font).setFontSize(8));
        cell.add(new Paragraph(order.getCustomer().getEmail()).setFont(font).setFontSize(8));
        cell.add(new Paragraph(order.getCustomer().getPhoneNo()).setFont(font).setFontSize(8));
        cell.add(new Paragraph(address).setFont(font).setFontSize(8));
        
        return cell;
    }
    
    private PdfFont getFont() throws IOException {
        return PdfFontFactory.createFont(
            new ClassPathResource("fonts/Roboto-Regular.ttf").getPath(),
            "Cp1250", 
            true
        );
    }
    
}
