package com.meet.lms.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class LoginRequest {

    @NotNull
    private String email;

    @NotNull
    @Length(min = 8, max = 16)
    private String password;

}
