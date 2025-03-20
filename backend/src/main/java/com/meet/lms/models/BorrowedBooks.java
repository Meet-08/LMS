package com.meet.lms.models;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class BorrowedBooks {

    @Id
    private String id;

    @NotNull
    private String userId;

    @NotNull
    private String bookId;

    @NotNull
    private double price;

    private boolean isReturned = false;

    private LocalDateTime borrowedDate = LocalDateTime.now();

    @NotNull
    private LocalDateTime dueDate;

    private LocalDateTime returnDate;

    private double fine = 0.0;

    private boolean notified = false;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
