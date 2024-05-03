package com.example.pizzapantrypal.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(name = "user_ingredients", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ingredient_id"}))
public class UserIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_ingredient_id;

    @Column(length = 50)
    private String name;

    @Column(length = 20)
    private String unit;

    @OneToOne
    @JoinColumn(name = "ingredient_id")
    private AvailableIngredient availableIngredient;

//    @ManyToOne
//    @JoinColumn(name = "pantry_id")
//    private Pantry pantry;

//    @OneToMany(mappedBy = "userIngredient")
//    private Set<Pantry> pantries;

    @OneToMany(mappedBy = "userIngredient")
    private Set<PizzaTemplateIngredient> pizzaTemplateIngredients;
    public Integer getUser_ingredient_id() {
        return user_ingredient_id;
    }

    public UserIngredient() {

    }

    public UserIngredient(String name, String unit) {
        this.name = name;
        this.unit = unit;
    }

    public void setUser_ingredient_id(Integer user_ingredient_id) {
        this.user_ingredient_id = user_ingredient_id;
    }
}