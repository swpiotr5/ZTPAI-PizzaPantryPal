package com.example.pizzapantrypal.security.services;

import com.example.pizzapantrypal.models.AvailableIngredient;
import com.example.pizzapantrypal.repository.AvailableIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableIngredientService {

    private final AvailableIngredientRepository availableIngredientRepository;

    @Autowired
    public AvailableIngredientService(AvailableIngredientRepository availableIngredientRepository) {
        this.availableIngredientRepository = availableIngredientRepository;
    }

    public List<AvailableIngredient> getAllAvailableIngredients() {
        return availableIngredientRepository.findAll();
    }

    public AvailableIngredient getAvailableIngredientById(Integer id) {
        return availableIngredientRepository.findById(id).orElse(null);
    }

    public AvailableIngredient saveAvailableIngredient(AvailableIngredient availableIngredient) {
        return availableIngredientRepository.save(availableIngredient);
    }
}