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
    private String phoneNoCode;
    @NotBlank(message = "Pole Telefonní číslo je povinné")
    private String phoneNo;
    private boolean isCompany;
    private String ico;
    private String dic;
    private String companyName;
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

    public String getPhoneNoCode() {
        return phoneNoCode;
    }

    public void setPhoneNoCode(String phoneNoCode) {
        this.phoneNoCode = phoneNoCode;
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

    public boolean isCompany() {
        return isCompany;
    }

    public void setIsCompany(boolean isCompany) {
        this.isCompany = isCompany;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIco() {
        return ico;
    }

    public void setIco(String ico) {
        this.ico = ico;
    }

    public String getDic() {
        return dic;
    }

    public void setDic(String dic) {
        this.dic = dic;
    }

    @Override
    public String toString() {
        return "CustomerInfo{" + "firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNoCode=" + phoneNoCode + 
                ", phoneNo=" + phoneNo + ", isCompany=" + isCompany + ", ico=" + ico + ", dic=" + dic + ", companyName=" + companyName + 
                ", address=" + address + '}';
    }

    

}
