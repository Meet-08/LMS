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
public class Book {

    @Id
    private String id;

    @NotNull
    private String title;

    @NotNull
    private String author;

    @NotNull
    private String description;

    @NotNull
    private double price;

    @NotNull
    private int quantity;


    private boolean availability = true;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
