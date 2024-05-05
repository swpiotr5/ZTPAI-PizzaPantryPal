package com.example.pizzapantrypal.repository;

import com.example.pizzapantrypal.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByUserId(Long userId);
}