package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.Order;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.pdfbox.util.Charsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ZasilkovnaCSVGeneratorServiceImpl implements ZasilkovnaCSVGeneratorService {
    
    @Autowired
    private OrderService orderService;

    @Override
    public ByteArrayInputStream buildCSVFile(List<Order> orders) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        OutputStreamWriter osw =new OutputStreamWriter(out, Charsets.WINDOWS_1252.name());
        CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(osw), CSVFormat.DEFAULT);

        for (Order order : orders) {
            double totalPrice = orderService.calculateTotalPrice(order, order.getDiscountValue());

            List<String> data = Arrays.asList(
                String.valueOf(order.getId()),
                order.getCustomer().getFirstName(),
                order.getCustomer().getLastName(),
                "",
                order.getCustomer().getEmail(),
                order.getCustomer().getPhoneNo(),
                "",
                "CZK",
                String.valueOf(totalPrice - order.getShipmentPrice()),
                "",
                "vydejni misto???",
                "zorganizovano.cz",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            );
            csvPrinter.printRecord(data);
        }

        csvPrinter.flush();

        return new ByteArrayInputStream(out.toByteArray());
    }

}
