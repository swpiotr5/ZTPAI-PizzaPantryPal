package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.UserIngredient;
import com.example.pizzapantrypal.models.Users;
import com.example.pizzapantrypal.repository.UserIngredientRepository;
import com.example.pizzapantrypal.repository.UserRepository;
import com.example.pizzapantrypal.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_ingredients")
public class UserIngredientController {

    @Autowired
    private UserIngredientRepository userIngredientRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserIngredient> getAllUserIngredients() {
        return userIngredientRepository.findAll();
    }

    @PostMapping
    public UserIngredient createUserIngredient(@RequestBody UserIngredient userIngredient) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Users currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            userIngredient.setUser(currentUser);
            return userIngredientRepository.save(userIngredient);
        } else {
            // log error or throw exception
            return null;
        }
    }

    @PostMapping("/add")
    public UserIngredient addUserIngredient(@RequestBody UserIngredient userIngredient) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Users currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            userIngredient.setUser(currentUser);
            return userIngredientRepository.save(userIngredient);
        } else {
            // log error or throw exception
            return null;
        }
    }
}