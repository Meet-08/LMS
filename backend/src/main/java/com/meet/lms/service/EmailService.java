package com.meet.lms.service;

import com.meet.lms.utils.EmailUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendEmail(String email, Integer otp, String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                "utf-8"
        );

        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(EmailUtil.emailTemplate(otp), true);

        javaMailSender.send(mimeMessage);
    }

    public void sendResetPasswordEmail(String email, String url, String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                "utf-8"
        );

        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(EmailUtil.resetPasswordTemplate(url), true);

        javaMailSender.send(mimeMessage);
    }

    public void sendNotificationEmail(String email, String bookTitle, String returnDate, String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                "utf-8"
        );

        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(EmailUtil.bookReturnReminderTemplate(bookTitle, returnDate), true);

        javaMailSender.send(mimeMessage);
    }
}
