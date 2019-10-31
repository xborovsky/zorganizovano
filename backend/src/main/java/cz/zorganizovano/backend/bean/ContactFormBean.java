package cz.zorganizovano.backend.bean;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ContactFormBean {

    @NotBlank(message = "Pole Jméno je povinné")
    private String name;
    @NotBlank(message = "Pole Email je povinné")
    @Email(message = "Email není validní")
    private String email;
    @NotNull(message = "Pole Typ dotazu je povinné")
    private Long type;
    @NotBlank(message = "Pole Dotaz je povinné")
    private String query;
    private String recaptchaToken;

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

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getRecaptchaToken() {
        return recaptchaToken;
    }

    public void setRecaptchaToken(String recaptchaToken) {
        this.recaptchaToken = recaptchaToken;
    }

}
