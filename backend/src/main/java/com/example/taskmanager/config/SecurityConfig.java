package com.example.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          // disable CSRF if you're strictly serving a REST API
          .csrf().disable()
          // allow anyone to hit /api/**
          .authorizeHttpRequests(auth -> auth
              .requestMatchers("/api/**").permitAll()
              .anyRequest().authenticated()
          )
          // no form‐login or basic auth challenge for your API
          .httpBasic().disable()
          .formLogin().disable();

        return http.build();
    }
}
