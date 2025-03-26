package com.meet.lms.service.automations;

import com.meet.lms.models.Book;
import com.meet.lms.models.BorrowedBooks;
import com.meet.lms.models.User;
import com.meet.lms.repository.BookRepository;
import com.meet.lms.repository.BorrowedBookRepository;
import com.meet.lms.repository.UserRepository;
import com.meet.lms.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchedulerService {

    private final BorrowedBookRepository borrowedBookRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 */2 * * *")
    public void notifyUsers() {
        try {
            System.out.println("Email notification scheduled");
            LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
            List<BorrowedBooks> borrowers =
                    borrowedBookRepository.findByDueDateAfterAndIsReturnedFalseAndNotifiedFalse(yesterday);

            borrowers.forEach(
                    b -> {
                        User user = userRepository.findById(b.getUserId()).orElseThrow(
                                () -> new RuntimeException("Could not find")
                        );

                        Book book = bookRepository.findById(b.getBookId()).orElseThrow(
                                () -> new RuntimeException("Could not find")
                        );

                        try {
                            emailService.sendNotificationEmail(
                                    user.getEmail(),
                                    book.getTitle(),
                                    b.getDueDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")),
                                    "Book return reminder"
                            );
                        } catch (MessagingException e) {
                            throw new RuntimeException(e);
                        }

                        b.setNotified(true);
                        borrowedBookRepository.save(b);

                    }
            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Scheduled(cron = "0 0 */1 * * *")
    public void removeUnverifiedUser() {
        try {
            List<User> users = userRepository.findByAccountVerified(false);
            users.forEach(user -> userRepository.deleteById(user.getId()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
