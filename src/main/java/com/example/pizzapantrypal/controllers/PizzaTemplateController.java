package com.example.pizzapantrypal.controllers;

import com.example.pizzapantrypal.models.PizzaTemplateIngredient;
import com.example.pizzapantrypal.repository.PizzaTemplateIngredientRepository;
import com.example.pizzapantrypal.repository.UserRepository;
import com.example.pizzapantrypal.models.Users;
import com.example.pizzapantrypal.models.PizzaTemplate;
import com.example.pizzapantrypal.repository.PizzaTemplateRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.pizzapantrypal.security.services.UserDetailsImpl;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/pizza_templates")
public class PizzaTemplateController {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger logger = LoggerFactory.getLogger(PizzaTemplateController.class);

    @Autowired
    private PizzaTemplateRepository pizzaTemplateRepository;

    @Autowired
    private PizzaTemplateIngredientRepository pizzaTemplateIngredientRepository;

    @Autowired
    private UserRepository usersRepository;

    @PostMapping
    public ResponseEntity<?> createPizzaTemplate(@RequestBody PizzaTemplate pizzaTemplateRequest) throws ChangeSetPersister.NotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
            Long currentUserId = userDetails.getId();

            // Tworzenie szablonu pizzy
            PizzaTemplate pizzaTemplate = new PizzaTemplate();
            pizzaTemplate.setName(pizzaTemplateRequest.getName());
            pizzaTemplate.setUserId(currentUserId);

            // Zapisujemy szablon pizzy w bazie danych
            PizzaTemplate savedPizzaTemplate = pizzaTemplateRepository.save(pizzaTemplate);

            // Ustawianie składników pizzy
            List<PizzaTemplateIngredient> ingredients = new ArrayList<>();
            for (PizzaTemplateIngredient ingredientRequest : pizzaTemplateRequest.getIngredients()) {
                PizzaTemplateIngredient ingredient = new PizzaTemplateIngredient();
                ingredient.setAvailableIngredientId(ingredientRequest.getAvailableIngredientId());
                ingredient.setAmount(ingredientRequest.getAmount());
                ingredient.setUnit(ingredientRequest.getUnit());
                ingredient.setTemplateId(savedPizzaTemplate.getId());
                ingredients.add(pizzaTemplateIngredientRepository.save(ingredient));
            }
            savedPizzaTemplate.setIngredients(ingredients);

            // Logowanie danych przychodzących
            logger.debug("Received PizzaTemplate: {}", savedPizzaTemplate);

            // Logowanie danych zapisanych
            logger.debug("Saved PizzaTemplate: {}", savedPizzaTemplate);

            return ResponseEntity.ok(savedPizzaTemplate);
        } else {
            throw new RuntimeException("Principal is not of type UserDetailsImpl");
        }
    }

    @GetMapping
    public ResponseEntity<List<PizzaTemplate>> getAllPizzaTemplates() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Long currentUserId = null;

        if (principal instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
            currentUserId = userDetails.getId();
        }

        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<PizzaTemplate> pizzaTemplates = pizzaTemplateRepository.findByUserId(currentUserId);
        for (PizzaTemplate template : pizzaTemplates) {
            List<PizzaTemplateIngredient> ingredients = pizzaTemplateIngredientRepository.findByTemplateId(template.getId());
            template.setIngredients(ingredients);
        }

        return ResponseEntity.ok(pizzaTemplates);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePizzaTemplate(@PathVariable Long id) {
        try {
            if (!pizzaTemplateRepository.existsById(Math.toIntExact(id))) {
                return ResponseEntity.notFound().build();
            }

            entityManager.createQuery("DELETE FROM PizzaTemplateIngredient pt WHERE pt.templateId = :id")
                    .setParameter("id", id)
                    .executeUpdate();

            entityManager.createQuery("DELETE FROM PizzaTemplate pt WHERE pt.id = :id")
                    .setParameter("id", id)
                    .executeUpdate();

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error occurred while deleting pizza template with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete pizza template");
        }
    }

}