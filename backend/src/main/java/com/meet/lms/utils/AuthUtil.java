package com.meet.lms.utils;

import org.springframework.security.crypto.keygen.KeyGenerators;

import java.security.SecureRandom;

public class AuthUtil {

    public static Integer generateOtp() {
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        sb.append(secureRandom.nextInt(9) + 1);
        for (int i = 1; i < 6; i++) {
            sb.append(secureRandom.nextInt(10));
        }
        return Integer.parseInt(sb.toString());
    }

    public static String generateResetPasswordToken() {
        return KeyGenerators.string().generateKey();
    }

    
}
