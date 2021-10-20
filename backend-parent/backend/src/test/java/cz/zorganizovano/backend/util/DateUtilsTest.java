package cz.zorganizovano.backend.util;

import java.util.Date;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class DateUtilsTest {
    
    @InjectMocks
    DateUtils dateUtils;

    @Test
    public void testGetDaysDiff() {
        assertEquals(10, dateUtils.getDaysDiff(new Date(1634752317112L), new Date(1633888260000L))); // 2021-10-20 17:45:12 vs 2021-10-10 17:45:12
    }
    
}
