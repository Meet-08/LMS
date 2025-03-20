package com.meet.lms.error;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ErrorResponse extends Exception {

    private int statusCode;

    public ErrorResponse(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
