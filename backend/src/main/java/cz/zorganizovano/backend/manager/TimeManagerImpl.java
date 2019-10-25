package cz.zorganizovano.backend.manager;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import org.springframework.stereotype.Component;

@Component
public class TimeManagerImpl implements TimeManager {

    @Override
    public Date getCurrentDate() {
        return new Date();
    }

    @Override
    public Date getNextDate(int plusDays) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, plusDays);

        return cal.getTime();
    }

    @Override
    public int getNumDaysBetween(Date start, Date end) {
        long diffInMillies = 0;

        if (start.before(end)) {
            diffInMillies = Math.abs(end.getTime() - start.getTime());
        } else {
            diffInMillies = Math.abs(start.getTime() - end.getTime());
        }

        return (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
    }

}
