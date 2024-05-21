package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.UserIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserIngredientRepository extends JpaRepository<UserIngredient, Integer> {
    List<UserIngredient> findByUserId(Long userId);
}