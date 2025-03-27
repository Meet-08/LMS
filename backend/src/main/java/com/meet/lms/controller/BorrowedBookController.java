package com.meet.lms.controller;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.dto.EmailRequest;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.BorrowedBooks;
import com.meet.lms.service.BorrowedBookService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/borrow")
@RequiredArgsConstructor
public class BorrowedBookController {

    private final BorrowedBookService borrowedBookService;

    @PostMapping("record-borrow-book/{id}")
    public ResponseEntity<ApiResponse<String>> recordBorrowedBook(
            @PathVariable String id,
            @Valid @RequestBody EmailRequest emailRequest
    ) {
        return borrowedBookService.recordBorrowedBook(id, emailRequest.getEmail());
    }

    @PutMapping("/return-borrowed-book/{bookId}")
    public ResponseEntity<ApiResponse<String>> returnBorrowedBook(
            @PathVariable String bookId,
            @Valid @RequestBody EmailRequest emailRequest
    ) {
        return borrowedBookService.returnBorrowedBook(bookId, emailRequest.getEmail());
    }

    @GetMapping("/borrowed-books-by-user")
    public ResponseEntity<ApiResponse<List<BorrowedBooks>>> getBorrowedBookForAdmin() {
        return borrowedBookService.getBorrowedBookForAdmin();
    }

    @GetMapping("/my-borrowed-books")
    public ResponseEntity<ApiResponse<List<BorrowedBooks>>> getBorrowedBooks(
            HttpServletRequest request
    ) {
        return borrowedBookService.getBorrowedBooks(request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(Exception ex) {
        ApiResponse<?> response = new ApiResponse<>(new ErrorResponse(ex.getMessage()
                , 400), false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
