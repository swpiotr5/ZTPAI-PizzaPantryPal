package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.Pantry;
import com.example.pizzapantrypal.repository.PantryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pantries")
public class PantryController {

    @Autowired
    private PantryRepository pantryRepository;

    @GetMapping
    public List<Pantry> getAllPantries() {
        return pantryRepository.findAll();
    }

    @PostMapping
    public Pantry createPantry(@RequestBody Pantry pantry) {
        return pantryRepository.save(pantry);
    }

}