package com.meet.lms.configuration;

import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;

import java.io.IOException;

public class SameSiteCookieFilter implements Filter {

    private String sameSitePolicy = "None";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String policy = filterConfig.getInitParameter("SameSitePolicy");
        if (policy != null) {
            sameSitePolicy = policy;
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (response instanceof HttpServletResponse) {
            HttpServletResponseWrapper responseWrapper = new HttpServletResponseWrapper((HttpServletResponse) response) {
                @Override
                public void addCookie(Cookie cookie) {
                    StringBuilder cookieString = new StringBuilder();
                    cookieString.append(cookie.getName()).append("=").append(cookie.getValue()).append("; Path=")
                            .append(cookie.getPath() == null ? "/" : cookie.getPath());

                    if (cookie.getMaxAge() >= 0) {
                        cookieString.append("; Max-Age=").append(cookie.getMaxAge());
                    }
                    if (cookie.getSecure()) {
                        cookieString.append("; Secure");
                    }
                    if (cookie.isHttpOnly()) {
                        cookieString.append("; HttpOnly");
                    }
                    cookieString.append("; SameSite=").append(sameSitePolicy);

                    ((HttpServletResponse) getResponse()).addHeader("Set-Cookie", cookieString.toString());
                }
            };
            chain.doFilter(request, responseWrapper);
        } else {
            chain.doFilter(request, response);
        }
    }
}
