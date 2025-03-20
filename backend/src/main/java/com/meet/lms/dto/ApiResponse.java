package com.meet.lms.dto;


import com.meet.lms.error.ErrorResponse;
import lombok.Data;

@Data
public class ApiResponse<T> {

    private T data;
    private ErrorResponse errorResponse;
    private boolean success;

    public ApiResponse(T data, boolean success) {
        this.data = data;
        this.success = success;
    }

    public ApiResponse(ErrorResponse error, boolean success) {
        this.errorResponse = error;
        this.success = success;
    }
}
