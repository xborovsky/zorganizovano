package cz.zorganizovano.backend.bean;

import java.util.Map;

public class CustomValidationError {

    private Map<String, String> errors;
    
    public CustomValidationError() {}
    
    public CustomValidationError(Map<String, String> errors) {
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
    
    
}
