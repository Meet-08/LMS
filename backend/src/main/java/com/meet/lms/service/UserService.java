package com.meet.lms.service;


import com.meet.lms.dto.ApiResponse;
import com.meet.lms.enums.UserRole;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.User;
import com.meet.lms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder encoder;

    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {

        List<User> allUsers = userRepository.findAll();

        List<User> verifiedUsers = allUsers.stream()
                .filter(User::isAccountVerified)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(verifiedUsers, true));
    }

    public ResponseEntity<ApiResponse<String>> registerNewAdmin(
            User user,
            MultipartFile avatarFile
    ) {
        try {
            if (userRepository.findByEmailAndAccountVerifiedTrue(user.getEmail()) != null)
                throw new ErrorResponse("User already registered", 400);

            if (avatarFile.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            String contentType = avatarFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("File format is not supported");
            }

            user.setPassword(encoder.encode(user.getPassword()));

            String avatarUrl = cloudinaryService.uploadImage(avatarFile);

            if (avatarUrl == null)
                throw new ErrorResponse("Image Upload failed", 500);

            user.setRole(UserRole.ADMIN);
            user.setAccountVerified(true);
            user.setAvatarUrl(avatarUrl);

            userRepository.save(user);

            return ResponseEntity.status(201)
                    .body(new ApiResponse<>("Admin registered successfully", true));

        } catch (ErrorResponse | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findByBorrowedBooksNotEmpty();

        return ResponseEntity.ok(users);
    }
}
