package com.chessgg.chessapp.maven.config;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.chessgg.chessapp.maven.model.User;
import com.chessgg.chessapp.maven.repository.UserRepository;

@Component
public class CustomAuthenticationProvider extends DaoAuthenticationProvider {

    private final UserRepository userRepository;

    public CustomAuthenticationProvider(UserRepository userRepository, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        setUserDetailsService(userDetailsService); 
        setPasswordEncoder(passwordEncoder); 
    }

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) {
        String rawPassword = (String) authentication.getCredentials();

        
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        
        String saltedPassword = user.getSalt() + rawPassword;

        if (!getPasswordEncoder().matches(saltedPassword, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}
