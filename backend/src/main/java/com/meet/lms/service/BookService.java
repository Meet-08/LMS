package com.meet.lms.service;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.Book;
import com.meet.lms.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public ResponseEntity<ApiResponse<String>> addBook(Book book) {
        try {
            Book savedBook = bookRepository.save(book);
            return ResponseEntity.status(201).body(new ApiResponse<>("Book added successfully", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Failed to add book", false));
        }
    }

    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    public ResponseEntity<ApiResponse<String>> deleteBook(String id) {
        try {
            bookRepository.findById(id).orElseThrow(
                    () -> new ErrorResponse("Book not found", 404)
            );
            bookRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse<>("Book deleted successfully", true));
        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<>(e.getMessage(), false));
        }
    }
}
