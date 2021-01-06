package cz.zorganizovano.backend.report;

import cz.zorganizovano.backend.entity.Order;
import java.io.IOException;
import java.sql.SQLException;

public interface InvoiceCreator {

    void exportInvoice(Order order) throws IOException, SQLException;

}
