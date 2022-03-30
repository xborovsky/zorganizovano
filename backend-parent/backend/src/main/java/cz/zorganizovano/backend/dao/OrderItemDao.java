package cz.zorganizovano.backend.dao;

import cz.zorganizovano.backend.bean.admin.report.ProductsByYearReportData;
import cz.zorganizovano.backend.entity.Order;
import cz.zorganizovano.backend.entity.OrderItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {

    @Query("SELECT SUM(i.quantity * i.price) FROM OrderItem i WHERE i.order.id = :orderId GROUP BY i.order.id")
    double getTotalOrderItemsPrice(long orderId);

    List<OrderItem> findByOrder(Order order);

    @Query("SELECT "
            + "new cz.zorganizovano.backend.bean.admin.report.ProductsByYearReportData(i.id, i.name, SUM(oi.quantity)) "
            + "FROM OrderItem oi "
            + "LEFT JOIN Order o ON (oi.order.id = o.id) "
            + "LEFT JOIN Item i ON (i.id = oi.item.id) "
            + "WHERE YEAR(o.created) = :year AND o.storno IS NULL "
            + "GROUP BY oi.item.id "
            + "ORDER BY SUM(oi.quantity) DESC"
    )
    List<ProductsByYearReportData> getProductsByYearReportData(int year);
    
}
