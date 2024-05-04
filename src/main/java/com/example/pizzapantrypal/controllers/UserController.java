package com.example.pizzapantrypal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.pizzapantrypal.models.Users;
import com.example.pizzapantrypal.repository.UserRepository;
import com.example.pizzapantrypal.security.services.UserDetailsImpl;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/current")
    public Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername()).orElse(null);
    }

    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/delete")
    public void deleteUser(@RequestBody String username) {
        userRepository.deleteByUsername(username);
    }
}