package com.meet.lms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmailRequest {

    @NotNull
    @Email
    private String email;

}
