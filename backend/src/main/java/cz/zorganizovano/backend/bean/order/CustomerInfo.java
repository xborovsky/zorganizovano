package cz.zorganizovano.backend.bean.order;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

public class CustomerInfo {

    @NotBlank(message = "Pole Jméno je povinné")
    private String firstName;
    @NotBlank(message = "Pole Příjmení je povinné")
    private String lastName;
    @Valid
    private Address address;

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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}
