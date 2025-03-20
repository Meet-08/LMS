package com.meet.lms.service;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.dto.ResetPasswordRequest;
import com.meet.lms.dto.UpdatePasswordRequest;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.User;
import com.meet.lms.repository.UserRepository;
import com.meet.lms.utils.AuthUtil;
import com.meet.lms.utils.CookieUtil;
import com.meet.lms.utils.JwtUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    @Value("${FRONTEND_URL}")
    private String frontend_url;

    public ResponseEntity<ApiResponse<String>> register(@Valid User user) {

        List<User> isExist = userRepository.findByEmailAndAccountVerified(user.getEmail(), true);

        try {

            if (!isExist.isEmpty()) {
                throw new ErrorResponse("User already registered", 400);
            }

            if (user.getPassword().length() < 8 || user.getPassword().length() > 16) {
                throw new ErrorResponse("Password must be between 8 and 16 characters long", 400);
            }
            user.setPassword(encoder.encode(user.getPassword()));

            Integer verificationCode = AuthUtil.generateOtp();
            user.setVerificationCode(verificationCode);
            user.setVerificationCodeExpire(LocalDateTime.now().plusMinutes(15));
            User savedUser = userRepository.save(user);
            emailService.sendEmail(
                    user.getEmail(),
                    verificationCode,
                    "Verification code(Vgec Library Management System)"
            );
            return ResponseEntity.ok(new ApiResponse<>("verificationCode sent successfully", true));
        } catch (MessagingException e) {
            ErrorResponse handler = new ErrorResponse(e.getMessage(), 500);
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse<String>(handler, false));
        } catch (ErrorResponse e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(new ApiResponse<String>(e, false));
        }
    }

    public ResponseEntity<ApiResponse<String>> verifyOTP(String email, Integer otp, HttpServletResponse response) {
        try {
            LinkedList<User> userAllEntries = userRepository.findByEmailAndAccountVerified(email, false)
                    .stream()
                    .sorted(Comparator.comparing(User::getCreatedAt).reversed())
                    .collect(Collectors.toCollection(LinkedList::new));

            if (userAllEntries.isEmpty()) {
                throw new ErrorResponse("User not found", 404);
            }

            User user = userAllEntries.poll();

            if (!userAllEntries.isEmpty()) {
                userRepository.deleteAll(userAllEntries);
            }

            if (!user.getVerificationCode().equals(otp)) {
                throw new ErrorResponse("Invalid OTP", 400);
            }

            if (LocalDateTime.now().isAfter(user.getVerificationCodeExpire())) {
                throw new ErrorResponse("OTP expired", 400);
            }

            user.setAccountVerified(true);
            User savedUser = userRepository.save(user);
            response.addCookie(
                    CookieUtil.getCookieValue("auth_token", jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId()), 7)
            );
            return ResponseEntity.ok(new ApiResponse<>("Account verified successfully", true));

        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ApiResponse<>(e.getMessage(), false));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(e.getMessage(), false));
        }
    }

    public ResponseEntity<ApiResponse<User>> login(String email, String password, HttpServletResponse response) {
        try {

            User user = userRepository.findByEmailAndAccountVerifiedTrue(email);
            if (user == null)
                throw new ErrorResponse("User not found", 404);

            if (!encoder.matches(password, user.getPassword()))
                throw new ErrorResponse("Password is incorrect", 400);

            response.addCookie(CookieUtil.deleteCookie("auth_token"));

            response.addCookie(
                    CookieUtil.getCookieValue("auth_token", jwtUtil.generateToken(user.getEmail(), user.getId()), 7)
            );

            return ResponseEntity.ok(new ApiResponse<>(user, true));

        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    new ApiResponse<>(new ErrorResponse(e.getMessage(), e.getStatusCode()), false)
            );
        }
    }

    public ResponseEntity<User> getUser(HttpServletRequest request) throws ErrorResponse {

        String token = null;

        for (Cookie c : request.getCookies()) {
            if (c.getName().equals("auth_token"))
                token = c.getValue();
        }

        if (!jwtUtil.validateToken(token, jwtUtil.getEmailFromToken(token)))
            throw new ErrorResponse("Invalid token", 401);


        String userId = jwtUtil.getSubjectFromToken(token);

        User user = userRepository.findById(userId).orElseThrow(() -> new ErrorResponse("User not found", 404));

        return ResponseEntity.ok(user);
    }

    public ResponseEntity<ApiResponse<String>> forgotPassword(String email) {
        User user = userRepository.findByEmailAndAccountVerifiedTrue(email);
        try {

            if (user == null)
                throw new ErrorResponse("User not found", 404);

            String resetPasswordToken = AuthUtil.generateResetPasswordToken();

            user.setResetPasswordToken(resetPasswordToken);
            user.setResetPasswordExpire(LocalDateTime.now().plusMinutes(15));

            String url = frontend_url + "/password/reset" + resetPasswordToken;
            String subject = "VGEC Library Management System Password recovery";

            emailService.sendResetPasswordEmail(email, url, subject);
            userRepository.save(user);

            return ResponseEntity.ok(new ApiResponse<>("Reset password link sent successfully " + email, true));
        } catch (ErrorResponse | MessagingException e) {
            if (user != null) {
                user.setResetPasswordToken(null);
                user.setResetPasswordExpire(null);
                userRepository.save(user);
            }
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<ApiResponse<String>> resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByResetPasswordToken(request.getToken());

        try {
            if (user == null || LocalDateTime.now().isAfter(user.getResetPasswordExpire()))
                throw new ErrorResponse("Reset password link expired", 400);

            if (!request.getPassword().equals(request.getConfirmPassword()))
                throw new ErrorResponse("Passwords do not match", 400);


            user.setPassword(encoder.encode(request.getPassword()));
            user.setResetPasswordToken(null);
            user.setResetPasswordExpire(null);
            userRepository.save(user);

            return ResponseEntity.ok(new ApiResponse<>("Password reset successfully", true));
        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ApiResponse<>(e.getMessage(), false));
        }
    }

    public ResponseEntity<ApiResponse<String>> updatePassword(UpdatePasswordRequest request) {

        User user = request.getUser();

        try {
            User currentUser = userRepository.findById(user.getId()).orElseThrow(() -> new ErrorResponse("User not found", 404));
            if (!encoder.matches(request.getPassword(), currentUser.getPassword()))
                throw new ErrorResponse("Current password is incorrect", 400);

            if (!request.getNewPassword().equals(request.getConfirmPassword()))
                throw new ErrorResponse("New passwords do not match", 400);

            currentUser.setPassword(encoder.encode(request.getNewPassword()));
            userRepository.save(currentUser);
            return ResponseEntity.ok(new ApiResponse<>("Password updated successfully", true));
        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ApiResponse<>(e.getMessage(), false));
        }
    }

}
