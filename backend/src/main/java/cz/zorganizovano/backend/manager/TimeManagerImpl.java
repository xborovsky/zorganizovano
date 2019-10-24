package cz.zorganizovano.backend.manager;

import java.util.Calendar;
import java.util.Date;
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

}
