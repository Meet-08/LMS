package com.meet.lms.utils;

public class EmailUtil {

    public static String emailTemplate(int otp) {
        return """
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;">
                    <strong style="font-size: 24px; color: #000;">Verify Your Email Address</strong><br><br>
                
                    <p style="font-size: 18px; color: #000;">
                        Hello, to complete your registration or login, please use the following verification code:
                    </p>
                
                    <strong style="font-size: 24px; color: #000; background: #f0f0f0; border-radius: 5px; padding: 10px 20px; margin: 10px auto; display: inline-block;">
                        %d
                    </strong>
                
                    <p style="font-size: 16px; color: #666;">
                        This code is valid for 15 minutes. Please do not share this code with anyone.
                    </p>
                
                    <p style="font-size: 16px; color: #666;">
                        If you did not request this email, please ignore it.
                    </p>
                
                    <footer style="text-align: center; font-size: 12px; color: #666;">
                        <p>© YourCompany Team</p>
                        <p style="font-size: 10px; color: #999;">This is an automated message. Please do not reply to this email.</p>
                    </footer>
                </div>
                """.formatted(otp);
    }

    public static String resetPasswordTemplate(String resetUrl) {
        return """
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;">
                    <strong style="font-size: 24px; color: #000;">Reset Your Password</strong><br><br>
                
                    <p style="font-size: 18px; color: #000;">
                        We received a request to reset your password. Click the button below to reset it.
                    </p>
                
                    <a href="%s" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                
                    <p style="font-size: 16px; color: #666;">
                        If you did not request a password reset, please ignore this email.
                    </p>
                
                    <p style="font-size: 14px; color: #666;">
                        For your security, this link will expire in 15 minutes.
                    </p>
                
                    <footer style="text-align: center; font-size: 12px; color: #666;">
                        <p>© YourCompany Team</p>
                        <p style="font-size: 10px; color: #999;">This is an automated message. Please do not reply to this email.</p>
                    </footer>
                </div>
                """.formatted(resetUrl);
    }

    public static String bookReturnReminderTemplate(String bookTitle, String returnDate) {
        return """
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff;">
                    <strong style="font-size: 24px; color: #000;">Book Return Reminder</strong><br><br>
                    <p style="font-size: 18px; color: #000;">
                        This is a friendly reminder that the book "<strong>%s</strong>" is due for return on <strong>%s</strong>.
                    </p>
                    <p style="font-size: 16px; color: #666;">
                        Please return the book by the due date to avoid any late fees.
                    </p>
                    <p style="font-size: 16px; color: #666;">
                        If you have already returned the book, kindly disregard this message.
                    </p>
                    <footer style="text-align: center; font-size: 12px; color: #666;">
                        <p>© YourLibrary Team</p>
                        <p style="font-size: 10px; color: #999;">This is an automated reminder. Please do not reply to this email.</p>
                    </footer>
                </div>
                """.formatted(bookTitle, returnDate);
    }
}
