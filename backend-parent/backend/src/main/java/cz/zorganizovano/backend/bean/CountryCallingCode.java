package cz.zorganizovano.backend.bean;

public class CountryCallingCode {

    private int code;
    private String region;
    
    public CountryCallingCode() {}
    
    public CountryCallingCode(int code, String region) {
        this.code = code;
        this.region = region;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
    
    
}
