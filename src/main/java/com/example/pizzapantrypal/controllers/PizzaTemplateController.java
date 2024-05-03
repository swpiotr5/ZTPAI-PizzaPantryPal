package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.PizzaTemplate;
import com.example.pizzapantrypal.repository.PizzaTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizza_templates")
public class PizzaTemplateController {

    @Autowired
    private PizzaTemplateRepository pizzaTemplateRepository;

    @GetMapping
    public List<PizzaTemplate> getAllPizzaTemplates() {
        return pizzaTemplateRepository.findAll();
    }

    @PostMapping
    public PizzaTemplate createPizzaTemplate(@RequestBody PizzaTemplate pizzaTemplate) {
        return pizzaTemplateRepository.save(pizzaTemplate);
    }

}