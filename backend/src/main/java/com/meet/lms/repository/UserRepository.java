package com.meet.lms.repository;

import com.meet.lms.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {


    User findByEmail(@NotNull @Email String email);

    User findByEmailAndAccountVerifiedTrue(@NotNull @Email String email);

    List<User> findByEmailAndAccountVerified(String email, boolean accountVerified);

    User findByResetPasswordToken(String resetPasswordToken);

    List<User> findByAccountVerified(boolean b);

    @Query("{'borrowedBooks': { $exists: true, $not: { $size: 0 } } }")
    List<User> findByBorrowedBooksNotEmpty();
}
