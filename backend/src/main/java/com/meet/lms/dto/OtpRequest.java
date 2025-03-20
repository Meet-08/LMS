package com.meet.lms.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OtpRequest {

    @NotNull
    private String email;

    @NotNull
    private Integer otp;

}
