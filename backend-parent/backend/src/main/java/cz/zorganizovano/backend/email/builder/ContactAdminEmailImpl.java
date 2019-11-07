package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.ContactFormBean;
import cz.zorganizovano.backend.dao.ContactQueryTypeDao;
import cz.zorganizovano.backend.entity.ContactQueryType;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactAdminEmailImpl implements ContactAdminEmail {

    @Autowired
    private ContactQueryTypeDao contactQueryTypDao;

    @Override
    public String getSubject() {
        return "Nový dotaz na zorganizovano.cz!";
    }

    @Override
    public String buildText(ContactFormBean contactFormBean) {
        String contactQueryType = "???";
        Optional<ContactQueryType> contactQueryTypeMaybe = contactQueryTypDao.findById(contactFormBean.getType());
        if (contactQueryTypeMaybe.isPresent()) {
            contactQueryType = contactQueryTypeMaybe.get().getType();
        }

        StringBuilder sb = new StringBuilder();
        sb.append("Jméno: ").append(contactFormBean.getName()).append("<br />")
            .append("Email: ").append(contactFormBean.getEmail()).append("<br />")
            .append("Typ dotazu: ").append(contactQueryType).append("<br />")
            .append("Dotaz: ").append(contactFormBean.getQuery());
        return sb.toString();
    }

}
