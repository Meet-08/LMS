package com.meet.lms.controller;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.User;
import com.meet.lms.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/add/new-admin")
    public ResponseEntity<ApiResponse<String>> registerNewAdmin(
            @Valid User user,
            @NotNull MultipartFile avatarFile
    ) {
        return userService.registerNewAdmin(user, avatarFile);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(Exception ex) {
        ApiResponse<?> response = new ApiResponse<>(new ErrorResponse(ex.getMessage()
                , 400), false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
