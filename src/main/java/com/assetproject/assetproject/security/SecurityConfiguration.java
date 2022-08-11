package com.assetproject.assetproject.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

//Allows me to access /h2console path without authentication so I can input the table.
@Configuration
public class SecurityConfiguration{

    //This is the new way to remove auth for a path. For some reason is doesn't work with @PostMapping controllers?
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/h2console/**", "/test123");
    }
}