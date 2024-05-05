package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.pizzapantrypal.models.Users;
import com.example.pizzapantrypal.repository.UserRepository;
import com.example.pizzapantrypal.security.services.UserDetailsImpl;
import com.example.pizzapantrypal.models.UserRole;
import com.example.pizzapantrypal.repository.UserRolesRepository;
import com.example.pizzapantrypal.models.Roles;
import com.example.pizzapantrypal.repository.RoleRepository;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRolesRepository userRolesRepository;

    @Autowired
    RoleRepository rolesRepository;

    @GetMapping("/current")
    public Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername()).orElse(null);
    }

    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/delete")
    public void deleteUser(@RequestBody String username) {
        userRepository.deleteByUsername(username);
    }

    @PostMapping("/changerole")
    public void changeUserRole(@RequestBody String username) {
        Users user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            UserRole userRoles = userRolesRepository.findByUserId(user.getId()).orElse(null);
            if (userRoles != null) {
                Roles currentRole = userRoles.getRole();
                if (currentRole.getId() == 1) {
                    Roles newRole = rolesRepository.findById(Long.valueOf(2)).orElse(null);
                    userRoles.setRole(newRole);
                } else if (currentRole.getId() == 2) {
                    Roles newRole = rolesRepository.findById(Long.valueOf(1)).orElse(null);
                    userRoles.setRole(newRole);
                }
                userRolesRepository.save(userRoles);
            }
        }
    }
}