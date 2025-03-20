package com.meet.lms.dto;

import com.meet.lms.models.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UpdatePasswordRequest {

    @NotNull
    private User user;

    @Length(min = 8, max = 16)
    private String password;

    @Length(min = 8, max = 16)
    private String newPassword;

    @Length(min = 8, max = 16)
    private String confirmPassword;

}
