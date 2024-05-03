package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.Pantry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PantryRepository extends JpaRepository<Pantry, Integer> {
}