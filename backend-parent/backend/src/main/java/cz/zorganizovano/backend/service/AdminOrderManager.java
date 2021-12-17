package cz.zorganizovano.backend.service;

import cz.zorganizovano.backend.entity.Order;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;

public interface AdminOrderManager {
    
    Date updatePaymentReceivedDate(Order order);
    
    Date updateReadyToShipDate(Order order);

    Date updateInvoiceSentDate(Order order) throws IOException, SQLException;

    Date updateShippedDate(Order order, String trackingNumber);

    Date updateStornoDate(Order order);
    
    void updateAdminNote(Order order, String note);
    
}
