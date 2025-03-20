package com.meet.lms.repository;

import com.meet.lms.models.BorrowedBooks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BorrowedBookRepository extends MongoRepository<BorrowedBooks, String> {

    List<BorrowedBooks> findByDueDateAfterAndReturnedFalseAndNotifiedFalse(LocalDateTime date);
}
