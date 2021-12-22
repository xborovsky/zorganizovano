package cz.zorganizovano.backend.validator;

import com.google.common.collect.ImmutableMap;
import cz.zorganizovano.backend.bean.CustomValidationError;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerDataValidatorImpl implements CustomerDataValidator {
    private static final Logger LOG = LoggerFactory.getLogger(CustomerDataValidatorImpl.class);
    
    @Autowired
    private PhoneNumberValidator phoneNumberValidator;

    @Override
    @Nullable
    public CustomValidationError validate(@Nonnull CustomerInfo customer) {
        try {
            if (!phoneNumberValidator.isValidPhoneNo(Integer.parseInt(customer.getPhoneNoCode()), Long.parseLong(customer.getPhoneNo()))) {
                return new CustomValidationError(ImmutableMap.of("phoneNo", "Telefonní číslo není platné."));
            }
            if (customer.isCompany()) {
                if (customer.getCompanyName().isBlank()) {
                    return new CustomValidationError(ImmutableMap.of("company_name", "Název fimy není validní."));
                } else if (!customer.getIco().matches("\\d{8}")) {
                    return new CustomValidationError(ImmutableMap.of("ico", "IČO není validní."));
                }
            }
            return null;
        } catch (NumberFormatException e) {
            LOG.error(e.getMessage(), e);
            return new CustomValidationError(ImmutableMap.of("phoneNo", "Telefonní číslo není platné."));
        }
    }
    
}
