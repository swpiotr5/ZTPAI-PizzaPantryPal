package com.example.pizzapantrypal.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_ingredients", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ingredient_id"}))
public class UserIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userIngredientId;

    @Column(nullable = false)
    private Float amount;

    @Column(length = 20, nullable = false)
    private String unit;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private AvailableIngredient availableIngredient;

    @OneToMany(mappedBy = "userIngredient")
    private Set<PizzaTemplateIngredient> pizzaTemplateIngredients;

    public UserIngredient() {
    }

    public UserIngredient(Float amount, String unit, Users user, AvailableIngredient availableIngredient) {
        this.amount = amount;
        this.unit = unit;
        this.user = user;
        this.availableIngredient = availableIngredient;
    }

    // Getters and Setters

    public Integer getUserIngredientId() {
        return userIngredientId;
    }

    public void setUserIngredientId(Integer userIngredientId) {
        this.userIngredientId = userIngredientId;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public AvailableIngredient getAvailableIngredient() {
        return availableIngredient;
    }

    public void setAvailableIngredient(AvailableIngredient availableIngredient) {
        this.availableIngredient = availableIngredient;
    }

    public Set<PizzaTemplateIngredient> getPizzaTemplateIngredients() {
        return pizzaTemplateIngredients;
    }

    public void setPizzaTemplateIngredients(Set<PizzaTemplateIngredient> pizzaTemplateIngredients) {
        this.pizzaTemplateIngredients = pizzaTemplateIngredients;
    }
}
