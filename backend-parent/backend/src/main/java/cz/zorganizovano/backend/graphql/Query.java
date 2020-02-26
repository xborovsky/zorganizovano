package cz.zorganizovano.backend.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import cz.zorganizovano.backend.dao.ContactQueryTypeDao;
import cz.zorganizovano.backend.dao.ServerNotificationDao;
import cz.zorganizovano.backend.endpoint.ResourceNotFoundException;
import cz.zorganizovano.backend.entity.ContactQueryType;
import cz.zorganizovano.backend.entity.ServerNotification;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver {
    
    @Autowired
    private ContactQueryTypeDao contactQueryTypeDao;
    @Autowired
    private ServerNotificationDao serverNotificationDao;

    public List<ContactQueryType> getContactQueryTypes() {
        return contactQueryTypeDao.findAll();
    }

    public ServerNotification getServerNotification() {
        return serverNotificationDao.findFirstByOrderByIdDesc().orElse(null);
    }
    
}
