package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.UserPizzaTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPizzaTemplateRepository extends JpaRepository<UserPizzaTemplate, Integer> {
}