package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.AvailableIngredient;
import com.example.pizzapantrypal.security.services.AvailableIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/available_ingredients")
public class AvailableIngredientController {

    private final AvailableIngredientService availableIngredientService;

    @Autowired
    public AvailableIngredientController(AvailableIngredientService availableIngredientService) {
        this.availableIngredientService = availableIngredientService;
    }

    @GetMapping
    public List<AvailableIngredient> getAllAvailableIngredients() {
        return availableIngredientService.getAllAvailableIngredients();
    }

//    @GetMapping("/{id}")
//    public AvailableIngredient getAvailableIngredientById(@PathVariable Integer id) {
//        return availableIngredientService.getAvailableIngredientById(id);
//    }

//    @PostMapping
//    public AvailableIngredient createAvailableIngredient(@RequestBody AvailableIngredient availableIngredient) {
//        return availableIngredientService.saveAvailableIngredient(availableIngredient);
//    }
}