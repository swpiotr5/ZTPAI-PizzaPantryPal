package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.PizzaTemplateIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PizzaTemplateIngredientRepository extends JpaRepository<PizzaTemplateIngredient, Integer> {
    List<PizzaTemplateIngredient> findByTemplateId(Integer id);

    void deleteByTemplateId(Long id);
}