package cz.zorganizovano.backend.bean;

import javax.validation.constraints.NotBlank;

public class CustomerBean {

    @NotBlank(message = "Pole Jméno je povinné")
    private String firstName;
    @NotBlank(message = "Pole Příjmení je povinné")
    private String lastName;
    @NotBlank(message = "Pole Ulice a číslo popisné jsou povinné")
    private String street;
    @NotBlank(message = "Pole PSČ je povinné")
    private String zipCode;
    @NotBlank(message = "Pole Obec je povinná")
    private String township;
    @NotBlank(message = "Pole Země je povinné")
    private String country;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getTownship() {
        return township;
    }

    public void setTownship(String township) {
        this.township = township;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

}
