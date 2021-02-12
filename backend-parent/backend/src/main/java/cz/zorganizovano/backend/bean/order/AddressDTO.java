package cz.zorganizovano.backend.bean.order;

import cz.zorganizovano.backend.entity.ShipmentCountry;
import cz.zorganizovano.backend.validator.EnumNamePattern;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class AddressDTO {

    @NotBlank(message = "Pole Ulice a číslo popisné jsou povinné")
    private String street;
    @NotBlank(message = "Pole Obec je povinné")
    private String township;
    @NotBlank(message = "Pole PSČ je povinné")
    @Pattern(regexp = "\\d{5}", message = "PSČ není validní")
    private String zipCode;
    @EnumNamePattern(regexp = "CESKA_REPUBLIKA|SLOVENSKA_REPUBLIKA", message = "Pole země je povinné")
    private ShipmentCountry country;

    public AddressDTO() {
    }

    public AddressDTO(String street, String township, String zipCode, ShipmentCountry country) {
        this.street = street;
        this.township = township;
        this.zipCode = zipCode;
        this.country = country;
    }

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

    public ShipmentCountry getCountry() {
        return country;
    }

    public void setCountry(ShipmentCountry country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "AddressDTO{" + "street=" + street + ", township=" + township + ", zipCode=" + zipCode + ", country=" + country + '}';
    }

}
