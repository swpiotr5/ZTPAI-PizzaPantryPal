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
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "ingredient_id")
    private Integer availableIngredient;

    public UserIngredient() {
    }

    public UserIngredient(Float amount, String unit, Users user, Integer availableIngredient) {
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

    public Integer getAvailableIngredient() {
        return this.availableIngredient;
    }

    public void setAvailableIngredient(Integer availableIngredient) {
        this.availableIngredient = availableIngredient;
    }

}
