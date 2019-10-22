package cz.zorganizovano.backend.bean.order;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Address {

    @NotBlank(message = "Pole Ulice a číslo popisné jsou povinné")
    private String street;
    @NotBlank(message = "Pole Obec je povinné")
    private String township;
    @NotBlank(message = "Pole PSČ je povinné")
    @Size(min = 5, max = 5, message = "PSČ není validní")
    private String zipCode;
    @NotBlank(message = "Pole Země je povinné")
    private String country;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getTownship() {
        return township;
    }

    public void setTownship(String township) {
        this.township = township;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

}
