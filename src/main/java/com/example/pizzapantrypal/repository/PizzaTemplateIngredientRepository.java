package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.PizzaTemplateIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaTemplateIngredientRepository extends JpaRepository<PizzaTemplateIngredient, Integer> {
}