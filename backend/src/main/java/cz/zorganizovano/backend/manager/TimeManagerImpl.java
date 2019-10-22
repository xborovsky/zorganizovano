package cz.zorganizovano.backend.manager;

import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class TimeManagerImpl implements TimeManager {

    @Override
    public Date getCurrentDate() {
        return new Date();
    }

}
