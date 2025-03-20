package com.meet.lms.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.meet.lms.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document
@Data
public class User {

    @Id
    private String id;

    @NotNull
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Length(min = 8, max = 16)
    private String password;

    private UserRole role = UserRole.USER;

    private boolean accountVerified = false;

    @DocumentReference(collection = "borrowedBooks")
    private List<BorrowedBooks> borrowedBooks = new ArrayList<>();

    private String avatarUrl;

    private Integer verificationCode;

    private LocalDateTime verificationCodeExpire;

    private String resetPasswordToken;

    private LocalDateTime resetPasswordExpire;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
