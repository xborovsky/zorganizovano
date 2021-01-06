package cz.zorganizovano.backend.report;

import cz.zorganizovano.backend.bean.report.InvoiceItem;
import cz.zorganizovano.backend.dao.InvoiceAddressDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import cz.zorganizovano.backend.entity.InvoiceAddress;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.service.OrderService;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

@Service
public class InvoiceCreatorImpl implements InvoiceCreator {
    private static final Logger LOG = LoggerFactory.getLogger(InvoiceCreatorImpl.class);
    
    private static final SimpleDateFormat SDF = new SimpleDateFormat("dd.MM.yyyy");
    
    private static final String PDF_FILE_EXTENSION = ".pdf";
    public static final String PRICE_SUFFIX = ",- Kč";

    @Value("${zorganizovano.invoice.export.location}")
    private String invoicesFolderLocation;
    
    @Autowired
    private OrderService orderService;
    @Autowired
    private InvoiceAddressDao invoiceAddressDao;
    @Autowired
    private OrderItemDao orderItemDao;
    
    File jasperFile;
    
    @PostConstruct
    public void init() {
        try {
            this.jasperFile = new File(ResourceUtils.getFile("classpath:jasper-templates/invoice.jasper").toURI());
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public void exportInvoice(Order order) throws IOException, SQLException {
        try {
            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(jasperFile);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, getParams(order), new JREmptyDataSource());
            
            String filePath = invoicesFolderLocation + File.separator + order.getOrderNum() + PDF_FILE_EXTENSION;
            File f = new File(filePath);
            if (f.exists()) {
                f.delete();
            }
            
            JRPdfExporter exporter = new JRPdfExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(filePath));

            SimplePdfReportConfiguration reportConfig = new SimplePdfReportConfiguration();
            reportConfig.setSizePageToContent(true);
            reportConfig.setForceLineBreakPolicy(false);

            SimplePdfExporterConfiguration exportConfig = new SimplePdfExporterConfiguration();
            exportConfig.setMetadataAuthor("zorganizovano.cz");
            exportConfig.setAllowedPermissionsHint("PRINTING");

            exporter.setConfiguration(reportConfig);
            exporter.setConfiguration(exportConfig);

            exporter.exportReport();
        } catch (JRException e) {
            LOG.error(e.getMessage(), e);
            throw new IOException(e);
        }
    }
    
    private Map<String, Object> getParams(Order order) throws SQLException, IOException {
        Map<String, Object> params = new HashMap<>();
        params.put("INVOICE_NO", String.valueOf(order.getOrderNum()));
        params.put("ISSUE_DATE", SDF.format(order.getCreated()));
        params.put("DUE_DATE", SDF.format(order.getMaturity()));
        params.put("CUSTOMER", buildCustomerInfo(order));
        params.put("TOTAL_PRICE", (int)orderService.calculateTotalPrice(order, order.getDiscountValue()) + PRICE_SUFFIX);
        params.put("LOGO", ImageIO.read(ResourceUtils.getFile("classpath:jasper-templates/images/Z_logo_pozitiv.png")));
        params.put("SIGNATURE", ImageIO.read(ResourceUtils.getFile("classpath:jasper-templates/images/razitko_podpis.jpg")));

        List<InvoiceItem> invoiceItems = orderItemDao.findByOrder(order).stream()
            .map(orderItem -> new InvoiceItem(orderItem))
            .collect(Collectors.toList());
        if (order.getDiscountValue() > 0) {
            invoiceItems.add(new InvoiceItem("Sleva", 1, ((int)order.getDiscountValue() * -1) + PRICE_SUFFIX));
        }
        invoiceItems.add(new InvoiceItem("Doprava (" + order.getShipmentType().getReadableName() + ")", 1, (int)order.getShipmentPrice() + PRICE_SUFFIX));

        JRBeanCollectionDataSource itemsJRBean = new JRBeanCollectionDataSource(invoiceItems);
        params.put("ItemDataSource", itemsJRBean);

        return params;
    }
    
    private String buildCustomerInfo(Order order) throws SQLException {
        InvoiceAddress invoiceAddress = invoiceAddressDao.findByOrder(order);
        
        return new StringBuilder()
            .append(order.getCustomer().getFirstName()).append(" ").append(order.getCustomer().getLastName())
            .append("\n")
            .append(invoiceAddress.getStreet())
            .append("\n")
            .append(invoiceAddress.getZipCode()).append(" ").append(invoiceAddress.getTownship())
            .toString();
    }
    
}
