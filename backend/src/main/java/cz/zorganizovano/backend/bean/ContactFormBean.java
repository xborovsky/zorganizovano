package cz.zorganizovano.backend.bean;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ContactFormBean {

    @NotBlank(message = "Pole Jméno je povinné")
    private String name;
    @NotBlank(message = "Pole Email je povinné")
    @Email(message = "Email není validní")
    private String email;
    @NotBlank(message = "Pole Typ dotazu je povinné")
    private String type;
    @NotBlank(message = "Pole Dotaz je povinné")
    private String query;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

}
