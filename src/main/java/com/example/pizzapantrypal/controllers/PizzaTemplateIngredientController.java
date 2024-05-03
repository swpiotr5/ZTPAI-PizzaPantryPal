package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.PizzaTemplateIngredient;
import com.example.pizzapantrypal.repository.PizzaTemplateIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizza_template_ingredients")
public class PizzaTemplateIngredientController {

    @Autowired
    private PizzaTemplateIngredientRepository pizzaTemplateIngredientRepository;

    @GetMapping
    public List<PizzaTemplateIngredient> getAllPizzaTemplateIngredients() {
        return pizzaTemplateIngredientRepository.findAll();
    }

    @PostMapping
    public PizzaTemplateIngredient createPizzaTemplateIngredient(@RequestBody PizzaTemplateIngredient pizzaTemplateIngredient) {
        return pizzaTemplateIngredientRepository.save(pizzaTemplateIngredient);
    }
}