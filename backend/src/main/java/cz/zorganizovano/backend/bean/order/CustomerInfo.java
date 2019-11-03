package cz.zorganizovano.backend.bean.order;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class CustomerInfo {

    @NotBlank(message = "Pole Jméno je povinné")
    private String firstName;
    @NotBlank(message = "Pole Příjmení je povinné")
    private String lastName;
    @NotBlank(message = "Pole Email je povinné")
    @Email(message = "Zadejte validní email")
    private String email;
    @NotBlank(message = "Pole Telefonní číslo je povinné")
    private String phoneNo;
    private AddressDTO address;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

}
