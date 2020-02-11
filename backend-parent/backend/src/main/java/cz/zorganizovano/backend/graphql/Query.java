package cz.zorganizovano.backend.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import cz.zorganizovano.backend.dao.ContactQueryTypeDao;
import cz.zorganizovano.backend.entity.ContactQueryType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver {
    
    @Autowired
    private ContactQueryTypeDao contactQueryTypeDao;

    public List<ContactQueryType> getContactQueryTypes() {
        return contactQueryTypeDao.findAll();
    }
    
}
