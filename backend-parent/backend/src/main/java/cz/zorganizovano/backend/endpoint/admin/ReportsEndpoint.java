package cz.zorganizovano.backend.endpoint.admin;

import cz.zorganizovano.backend.bean.admin.report.ProductsByYearReportData;
import cz.zorganizovano.backend.dao.OrderDao;
import cz.zorganizovano.backend.dao.OrderItemDao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/reports")
public class ReportsEndpoint {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;
    
    @GetMapping("/products-by-year/available-years")
    public List<Integer> getAvailableYearsForProductsByYearReportData() {
        return orderDao.findDistinctYears();
    }
    
    @GetMapping("/products-by-year/{year}")
    public List<ProductsByYearReportData> getProductsByYearReportData(@PathVariable("year") int year) {
        return orderItemDao.getProductsByYearReportData(year);
    }
    
}
