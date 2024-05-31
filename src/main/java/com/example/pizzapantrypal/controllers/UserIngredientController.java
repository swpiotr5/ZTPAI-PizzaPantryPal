package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.PizzaTemplate;
import com.example.pizzapantrypal.models.PizzaTemplateIngredient;
import com.example.pizzapantrypal.models.UserIngredient;
import com.example.pizzapantrypal.models.Users;
import com.example.pizzapantrypal.repository.PizzaTemplateRepository;
import com.example.pizzapantrypal.repository.UserIngredientRepository;
import com.example.pizzapantrypal.repository.UserRepository;
import com.example.pizzapantrypal.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user_ingredients")
public class UserIngredientController {

    @Autowired
    private UserIngredientRepository userIngredientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PizzaTemplateRepository pizzaTemplateRepository;

    @GetMapping
    public List<UserIngredient> getAllUserIngredients() {
        return userIngredientRepository.findAll();
    }

    @PostMapping
    public UserIngredient createUserIngredient(@RequestBody UserIngredient userIngredient) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Users currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            userIngredient.setUser(currentUser);
            return userIngredientRepository.save(userIngredient);
        } else {
            // log error or throw exception
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUserIngredient(@RequestBody UserIngredient userIngredient) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Users currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            userIngredient.setUser(currentUser);
            Optional<UserIngredient> existingIngredient = userIngredientRepository.findByUserIdAndAvailableIngredient(currentUser.getId(), userIngredient.getAvailableIngredient());

            if (existingIngredient.isPresent()) {
                UserIngredient ingredientToUpdate = existingIngredient.get();
                ingredientToUpdate.setAmount(ingredientToUpdate.getAmount() + userIngredient.getAmount());
                userIngredientRepository.save(ingredientToUpdate);
                return ResponseEntity.ok("Existing ingredient updated with " + userIngredient.getAmount() + "g");
            } else {
                userIngredientRepository.save(userIngredient);
                return ResponseEntity.ok("New ingredient added with " + userIngredient.getAmount() + "g");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }


    @GetMapping("/user")
    public List<UserIngredient> getUserIngredients() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            return userIngredientRepository.findByUserId(userId);
        }
        return null;
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateUserIngredientsAfterSale(@RequestBody SaleRequest saleRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            Optional<PizzaTemplate> optionalTemplate = pizzaTemplateRepository.findById(saleRequest.getTemplateId());
            if (optionalTemplate.isPresent()) {
                PizzaTemplate pizzaTemplate = optionalTemplate.get();
                List<UserIngredient> userIngredients = userIngredientRepository.findByUserId(userId);

                // Check if user has enough ingredients
                for (PizzaTemplateIngredient templateIngredient : pizzaTemplate.getIngredients()) {
                    boolean hasEnough = false;
                    for (UserIngredient userIngredient : userIngredients) {
                        if (userIngredient.getAvailableIngredient().equals(templateIngredient.getAvailableIngredientId())) {
                            float amountToSubtract = Float.parseFloat(templateIngredient.getAmount()) * saleRequest.getSoldAmount();
                            if (userIngredient.getAmount() >= amountToSubtract) {
                                hasEnough = true;
                            } else {
                                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                        .body("Not enough ingredients. Check your pantry.");
                            }
                        }
                    }
                    if (!hasEnough) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("Not enough ingredients. Check your pantry.");
                    }
                }

                // Update user ingredients
                for (PizzaTemplateIngredient templateIngredient : pizzaTemplate.getIngredients()) {
                    for (UserIngredient userIngredient : userIngredients) {
                        if (userIngredient.getAvailableIngredient().equals(templateIngredient.getAvailableIngredientId())) {
                            float amountToSubtract = Float.parseFloat(templateIngredient.getAmount()) * saleRequest.getSoldAmount();
                            userIngredient.setAmount(userIngredient.getAmount() - amountToSubtract);

                            // Check if the ingredient amount is 0 or less after subtraction
                            if (userIngredient.getAmount() <= 0) {
                                userIngredientRepository.delete(userIngredient);
                            } else {
                                userIngredientRepository.save(userIngredient);
                            }
                            break;
                        }
                    }
                }
                return ResponseEntity.ok("Ingredients updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Template not found");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }

    @DeleteMapping("/delete/{ingredientId}")
    public ResponseEntity<String> deleteUserIngredient(@PathVariable Long ingredientId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();

            Optional<UserIngredient> userIngredient = userIngredientRepository.findByUserIdAndAvailableIngredient(userId, Math.toIntExact(ingredientId));

            if (userIngredient.isPresent()) {
                userIngredientRepository.delete(userIngredient.get());
                return ResponseEntity.ok("Ingredient deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ingredient not found");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }


}

class SaleRequest {
    private Integer templateId;
    private int soldAmount;

    // Getters and Setters
    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public int getSoldAmount() {
        return soldAmount;
    }

    public void setSoldAmount(int soldAmount) {
        this.soldAmount = soldAmount;
    }
}
