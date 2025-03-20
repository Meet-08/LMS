package com.meet.lms.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class CorsConfig implements WebMvcConfigurer {

    private final String FRONTEND_URL;

    public CorsConfig(@Value("${FRONTEND_URL}") String FRONTEND_URL) {
        this.FRONTEND_URL = FRONTEND_URL;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedOrigins(FRONTEND_URL)
                .allowCredentials(true);
    }
}
