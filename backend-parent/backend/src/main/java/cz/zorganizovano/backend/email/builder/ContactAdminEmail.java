package cz.zorganizovano.backend.email.builder;

import cz.zorganizovano.backend.bean.ContactFormBean;

public interface ContactAdminEmail extends SimpleEmail {

    String buildText(ContactFormBean contactFormBean);

}
