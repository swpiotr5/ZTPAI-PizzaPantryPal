package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.AvailableIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableIngredientRepository extends JpaRepository<AvailableIngredient, Integer> {
}