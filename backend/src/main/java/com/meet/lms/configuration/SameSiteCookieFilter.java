package com.meet.lms.configuration;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;

@Component
public class SameSiteCookieFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        chain.doFilter(request, response);

        if (response instanceof HttpServletResponse) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            Collection<String> headers = httpResponse.getHeaders("Set-Cookie");
            if (headers != null && !headers.isEmpty()) {
                // Clear existing Set-Cookie headers
                httpResponse.setHeader("Set-Cookie", null);
                for (String header : headers) {
                    // Append SameSite=None if it's not already present.
                    if (!header.toLowerCase().contains("samesite")) {
                        header = header + "; SameSite=None; Secure";
                    }
                    httpResponse.addHeader("Set-Cookie", header);
                }
            }
        }
    }
}
