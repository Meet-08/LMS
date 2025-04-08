package com.meet.lms.service;

import com.meet.lms.dto.ApiResponse;
import com.meet.lms.error.ErrorResponse;
import com.meet.lms.models.Book;
import com.meet.lms.models.BorrowedBooks;
import com.meet.lms.models.User;
import com.meet.lms.repository.BookRepository;
import com.meet.lms.repository.BorrowedBookRepository;
import com.meet.lms.repository.UserRepository;
import com.meet.lms.utils.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.meet.lms.utils.BookUtil.calculateFine;

@Service
@RequiredArgsConstructor
public class BorrowedBookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowedBookRepository borrowedBookRepository;
    private final JwtUtil jwtUtil;

    public ResponseEntity<ApiResponse<String>> recordBorrowedBook(String id, String email) {
        try {
            Book book = bookRepository.findById(id).orElseThrow(
                    () -> new ErrorResponse("Book not found", 404)
            );

            if (!book.isAvailability()) {
                throw new ErrorResponse("Book not available", 404);
            }

            User user = userRepository.findByEmailAndAccountVerifiedTrue(email);

            if (user == null)
                throw new ErrorResponse("User not found", 404);

            boolean isAlreadyBorrowed = user.getBorrowedBooks().stream()
                    .anyMatch(b -> b.getBookId().equals(book.getId()));

            if (isAlreadyBorrowed)
                throw new ErrorResponse("User has already borrowed this book", 409);

            book.setQuantity(book.getQuantity() - 1);
            book.setAvailability(book.getQuantity() > 0);

            bookRepository.save(book);

            BorrowedBooks borrowedBook = new BorrowedBooks();

            borrowedBook.setBookId(book.getId());
            borrowedBook.setBookTitle(book.getTitle());
            borrowedBook.setUserId(user.getId());
            borrowedBook.setPrice(book.getPrice());
            borrowedBook.setDueDate(borrowedBook.getBorrowedDate().plusDays(2));

            BorrowedBooks savedBook = borrowedBookRepository.save(borrowedBook);
            user.getBorrowedBooks().add(savedBook);
            userRepository.save(user);

            return ResponseEntity.status(201).body(
                    new ApiResponse<>("Borrowed book recorded successfully", true)
            );

        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<>(e.getMessage(), false));
        }
    }

    public ResponseEntity<ApiResponse<String>> returnBorrowedBook(String bookId, String email) {
        try {
            Book book = bookRepository.findById(bookId).orElseThrow(
                    () -> new ErrorResponse("Book not found", 404)
            );

            User user = userRepository.findByEmailAndAccountVerifiedTrue(email);

            if (user == null)
                throw new ErrorResponse("User not found", 404);

            BorrowedBooks borrowedBook = user.getBorrowedBooks().stream()
                    .filter(b -> b.getBookId().equals(book.getId()))
                    .findFirst()
                    .orElseThrow(() -> new ErrorResponse("User has not borrowed this book", 400));

            borrowedBook.setReturned(true);
            borrowedBook.setReturnDate(LocalDateTime.now());
            borrowedBook.setFine(calculateFine(borrowedBook.getDueDate()));


            book.setQuantity(book.getQuantity() + 1);
            book.setAvailability(book.getQuantity() > 0);

            userRepository.save(user);
            bookRepository.save(book);
            borrowedBookRepository.save(borrowedBook);

            String res = borrowedBook.getFine() > 0 ?
                    "The book has been returned successfully. The total charges, includes a fine, are " + (borrowedBook.getFine() + book.getPrice()) + " INR" :
                    "The book has been returned successfully. The total charges are " + book.getPrice() + " INR";

            return ResponseEntity.ok(
                    new ApiResponse<>(res, true)
            );

        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<>(e.getMessage(), false));
        }
    }

    public ResponseEntity<ApiResponse<List<BorrowedBooks>>> getBorrowedBookForAdmin() {
        try {
            List<BorrowedBooks> borrowedBooks = borrowedBookRepository.findAll();

            if (borrowedBooks.isEmpty()) {
                throw new ErrorResponse("No borrowed books found", 404);
            }

            return ResponseEntity.ok(
                    new ApiResponse<>(borrowedBooks, true)
            );
        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<>(
                    new ErrorResponse(e.getMessage(), e.getStatusCode()), false)
            );
        }
    }

    public ResponseEntity<ApiResponse<List<BorrowedBooks>>> getBorrowedBooks(HttpServletRequest request) {

        try {
            Cookie[] cookie = request.getCookies();
            if (cookie == null || cookie.length == 0) {
                throw new ErrorResponse("No authentication cookie found", 401);
            }

            String token = null;

            for (Cookie c : cookie) {
                if (c.getName().equals("auth_token"))
                    token = c.getValue();
            }

            if (token == null)
                throw new ErrorResponse("No authentication cookie found", 401);

            User user = userRepository.findByEmailAndAccountVerifiedTrue(jwtUtil.getEmailFromToken(token));
            if (user == null)
                throw new ErrorResponse("User not found", 404);

            List<BorrowedBooks> borrowedBooks = user.getBorrowedBooks();
            return ResponseEntity.ok(
                    new ApiResponse<>(borrowedBooks, true)
            );
        } catch (ErrorResponse e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<>(
                    new ErrorResponse(e.getMessage(), e.getStatusCode()), false)
            );
        }

    }
}
