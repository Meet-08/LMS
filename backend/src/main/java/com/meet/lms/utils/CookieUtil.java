package com.meet.lms.utils;

import jakarta.servlet.http.Cookie;

public class CookieUtil {

    public static Cookie getCookieValue(String cookieName, String cookieValue, int days) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true); //true in production
        cookie.setMaxAge(days * 24 * 60 * 60);
        return cookie;
    }

    public static Cookie deleteCookie(String cookieName) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        return cookie;
    }
}
