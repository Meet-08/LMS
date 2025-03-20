package com.meet.lms.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ResetPasswordRequest {

    @NotNull
    @Length(min = 8, max = 16)
    private String password;

    @NotNull
    @Length(min = 8, max = 16)
    private String confirmPassword;

    private String token;

}
