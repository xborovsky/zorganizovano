package cz.zorganizovano.backend.endpoint;

import com.google.i18n.phonenumbers.PhoneNumberUtil;
import cz.zorganizovano.backend.bean.CountryCallingCode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/phone-number")
public class PhoneNumberEndpoint {
    
    private final PhoneNumberUtil phoneNumberUtil = PhoneNumberUtil.getInstance();
    
    @Cacheable("phone-number-codes")
    @GetMapping("/codes")
    public List<CountryCallingCode> getAllCountryCodes() {
        List<Integer> callingCodes = new ArrayList<>(phoneNumberUtil.getSupportedCallingCodes());
        Collections.sort(callingCodes);
        return callingCodes.stream().map(code -> {
            String region = phoneNumberUtil.getRegionCodeForCountryCode(code);
            Locale l = new Locale("", region);
            return new CountryCallingCode(code, l.getDisplayCountry(new Locale("cs", "cz")));
        }).collect(Collectors.toList());
    }
    
}
