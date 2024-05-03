package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.PizzaTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaTemplateRepository extends JpaRepository<PizzaTemplate, Integer> {
}