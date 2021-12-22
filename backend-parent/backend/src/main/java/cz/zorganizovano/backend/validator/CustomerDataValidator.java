package cz.zorganizovano.backend.validator;

import cz.zorganizovano.backend.bean.CustomValidationError;
import cz.zorganizovano.backend.bean.order.CustomerInfo;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public interface CustomerDataValidator {
    
    @Nullable
    CustomValidationError validate(@Nonnull CustomerInfo customerInfo);
    
}
