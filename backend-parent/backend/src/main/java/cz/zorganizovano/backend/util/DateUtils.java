package cz.zorganizovano.backend.util;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import org.springframework.stereotype.Component;

@Component
public class DateUtils {
    
    public boolean isBeforeCurrentTimestamp(Date date) {
        return new Date().before(date);
    }
    
    public boolean isAfterCurrentTimestamp(Date date) {
        return new Date().after(date);
    }
    
    public long getDaysDiff(Date d1, Date d2) {
        long diffInMillies = Math.abs(d2.getTime() - d1.getTime());
        return TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
    }

    public Date getTodayMidnight() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        return cal.getTime();
    }
    
}
