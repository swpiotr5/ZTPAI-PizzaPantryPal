package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.UserIngredient;
import com.example.pizzapantrypal.repository.UserIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_ingredients")
public class UserIngredientController {

    @Autowired
    private UserIngredientRepository userIngredientRepository;

    @GetMapping
    public List<UserIngredient> getAllUserIngredients() {
        return userIngredientRepository.findAll();
    }

    @PostMapping
    public UserIngredient createUserIngredient(@RequestBody UserIngredient userIngredient) {
        return userIngredientRepository.save(userIngredient);
    }

}