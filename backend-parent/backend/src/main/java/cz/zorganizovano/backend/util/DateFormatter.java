package cz.zorganizovano.backend.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public final class DateFormatter {

    private static final SimpleDateFormat SDF = new SimpleDateFormat("dd.MM.yyyy");

    public static String formatDate(Date date) {
        return SDF.format(date);
    }

}
