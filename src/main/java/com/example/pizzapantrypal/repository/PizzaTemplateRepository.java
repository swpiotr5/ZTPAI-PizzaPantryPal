package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.PizzaTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PizzaTemplateRepository extends JpaRepository<PizzaTemplate, Integer> {
    List<PizzaTemplate> findByUserId(Long currentUserId);
}
