package com.meet.lms.controller;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.Book;
import com.meet.lms.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/admin/add")
    public ResponseEntity<ApiResponse<String>> addBook(@Valid @RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        return bookService.getAllBooks();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBook(@PathVariable String id) {
        return bookService.deleteBook(id);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleValidationExceptions(Exception ex) {
        ApiResponse<String> response = new ApiResponse<>(new ErrorResponse(ex.getMessage()
                , 400), false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
