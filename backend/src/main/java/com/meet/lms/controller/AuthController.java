package com.meet.lms.controller;

import com.meet.lms.dto.*;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.User;
import com.meet.lms.service.AuthService;
import com.meet.lms.utils.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(
            @Valid @RequestBody OtpRequest otpRequest,
            HttpServletResponse response
    ) {

        return authService.verifyOTP(otpRequest.getEmail(), otpRequest.getOtp(), response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        return authService.login(request.getEmail(), request.getPassword(), response);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        response.addCookie(CookieUtil.deleteCookie("auth_token"));
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<User> getUser(HttpServletRequest request) throws ErrorResponse {
        return authService.getUser(request);
    }

    @PostMapping("/password/forgot")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody EmailRequest request) {
        return authService.forgotPassword(request.getEmail());
    }

    @PutMapping("/password/reset/{token}")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request,
            @Valid @PathVariable String token
    ) {
        request.setToken(token);
        return authService.resetPassword(request);
    }

    @PutMapping("/password/update")
    public ResponseEntity<ApiResponse<String>> updatePassword(
            @Valid @RequestBody UpdatePasswordRequest request
    ) {
        return authService.updatePassword(request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(Exception ex) {
        ApiResponse<?> response = new ApiResponse<>(new ErrorResponse(ex.getMessage()
                , 400), false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
