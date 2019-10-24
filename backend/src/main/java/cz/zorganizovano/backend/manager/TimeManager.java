package cz.zorganizovano.backend.manager;

import java.util.Date;

public interface TimeManager {

    Date getCurrentDate();

    Date getNextDate(int plusDays);

}
