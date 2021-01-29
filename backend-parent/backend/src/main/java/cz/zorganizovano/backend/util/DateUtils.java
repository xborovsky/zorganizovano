package cz.zorganizovano.backend.util;

import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class DateUtils {
    
    public boolean isBeforeCurrentTimestamp(Date date) {
        return new Date().before(date);
    }
    
    public boolean isAfterCurrentTimestamp(Date date) {
        return new Date().after(date);
    }
    
}
