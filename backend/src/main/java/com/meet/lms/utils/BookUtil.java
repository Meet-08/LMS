package com.meet.lms.utils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class BookUtil {

    public static double calculateFine(LocalDateTime dueDate) {
        double finePerHour = 1;
        LocalDateTime now = LocalDateTime.now();

        if (now.isAfter(dueDate)) {
            long extraHours = ChronoUnit.HOURS.between(dueDate, now);
            return extraHours * finePerHour;
        }

        return 0;
    }

}
