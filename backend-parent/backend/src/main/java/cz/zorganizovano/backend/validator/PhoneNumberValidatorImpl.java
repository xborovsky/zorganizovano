package cz.zorganizovano.backend.validator;

import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PhoneNumberValidatorImpl implements PhoneNumberValidator {
    private static final Logger LOG = LoggerFactory.getLogger(PhoneNumberValidatorImpl.class);

    @Override
    public boolean isValidPhoneNo(int phoneNoCode, long phoneNo) {
        PhoneNumber phoneNum = new PhoneNumber();
        phoneNum.setCountryCode(phoneNoCode);
        phoneNum.setNationalNumber(phoneNo);
        return PhoneNumberUtil.getInstance().isValidNumber(phoneNum);
    }
    
}
